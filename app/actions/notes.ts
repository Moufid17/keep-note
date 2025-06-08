"use server"
import { getUser } from '@/auth/server';
import { prismaClient } from '@/db/prisma'
import { handleError } from '@/lib/utils';

import {OpenAI} from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { z } from "zod";

export const createNoteAction = async (noteId: string) => {
    try {
        if (noteId.length <= 0) throw new Error("Note ID is required");

        // User from supabase auth
        const user = await getUser();
        if (!user) throw new Error("User not found");

        // User from database
        const existingNote = await prismaClient.user.findUnique({
            where: { email: user.email },
            select: {
                id: true,
            }
        });
        if (!existingNote) throw new Error("User not found");
    
        await prismaClient.note.create({
            data: {
                id: noteId,
                // title: "",
                text: "",
                authorId: existingNote.id,
            }
        })
        return {errorMessage: null}
    } catch (error) {
        return handleError(error);
    }
}

export const updateNoteAction = async (noteId: string, text: string, title="") => {
    try {
        if (noteId.length <= 0) throw new Error("Note ID is required");
        if (text.length <= 0) throw new Error("Text is required");

        const user = await getUser();
        if (!user) throw new Error("You must be logged in to update a note");
    
        await prismaClient.note.update({
            where: { id: noteId },
            data: { text , title },
        });
    
        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
  };

export const updateNoteTitleAction = async (noteId: string, title="") => {
    try {
        if (noteId.length <= 0) throw new Error("Note ID is required");
        if (title.length <= 0) throw new Error("Text is required");

        const user = await getUser();
        if (!user) throw new Error("You must be logged in to update a note");
    
        await prismaClient.note.update({
            where: { id: noteId },
            data: { title },
        });
    
        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
};

export const updateNoteArchiveAction = async (noteId: string, isArchive=false) => {
    try {
        if (noteId.length <= 0) throw new Error("Note ID is required");

        const user = await getUser();
        if (!user) throw new Error("You must be logged in to update a note");
    
        await prismaClient.note.update({
            where: { id: noteId },
            data: { isArchived: isArchive },
        });
    
        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
};
  
export const deleteNoteAction = async (noteId: string) => {
    try {
        if (noteId.length <= 0) throw new Error("Note ID is required");

        const user = await getUser();
        if (!user) throw new Error("You must be logged in to delete a note");
    
        await prismaClient.note.delete({
            where: { id: noteId, authorId: user.id },
        });
    
        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
};

const schema = z.object({
    noteId: z.string().min(1, "Note ID is required"),
    questions: z.array(z.string().min(1, "Question must not be empty")).min(1, "At least one question is required"),
    responses: z.array(z.string()).min(0, "At least one response is required"),
});

type AskAIActionInputParams = z.infer<typeof schema>;

export const askAIAction = async (noteId: string, questions: string[], responses: string[]) => {
    try {
        // Validate inputs
        const parsedData = schema.safeParse({ noteId, questions, responses });
        if (!parsedData.success) {
            const errorMessages = parsedData.error.errors.map(err => err.message).join(", ");
            throw new Error(`Validation failed: ${errorMessages}`);
        }
        noteId = parsedData.data.noteId;
        questions = parsedData.data.questions;
        responses = parsedData.data.responses;
        // if (noteId.length <= 0 || questions.length <= 0 || responses.length <= 0) throw new Error("Note ID is required or questions/responses are empty");

        const user = await getUser();
        if (!user) throw new Error("You must be logged in to ask AI");
    
        const note = await prismaClient.note.findUnique({
            where: { id: noteId, author: {
                email: user.email,
            } },
            select: { text: true, createdAt: true, updatedAt: true },
        });
    
        if (!note) {
            console.log(`Note with ID ${noteId} not found for user ${user.email}`);
            console.log(`NOtes details:`, note);
            
            
            throw new Error("Note not found")
        };

        // Format the notes for the AI
        const formattedNotes = `
            Text: ${note.text}\n
            Created at: ${note.createdAt}\n
            Last updated: ${note.updatedAt}
        `.trim()

        // Ensure the note text is not empty
        if (!note.text || note.text.trim().length === 0) {
            return formattedNotes
        }

        // OpenAI API call
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        const context = `
            You are a helpful assistant that answers questions about a user's note. 
            Assume all questions are related to the user's note. 
            Make sure that your answers are not too verbose and you speak succinctly. 
            Your responses MUST be formatted in clean, valid HTML with proper structure. 
            Use tags like <p>, <strong>, <em>, <ul>, <ol>, <li>, <h1> to <h6>, <code> and <br> when appropriate. 
            Do NOT wrap the entire response in a single <p> tag unless it's a single paragraph. 
            Avoid inline styles, JavaScript, or custom attributes.
            
            Rendered like this in JSX:
            <p dangerouslySetInnerHTML={{ __html: YOUR_RESPONSE }} />
        
            Here are the user's note:
            ${formattedNotes}
        `
        const messages: ChatCompletionMessageParam[] = [ { role: "developer", content: context, }, ];

        // Add questions and responses to the messages
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];

            messages.push( { role: 'user', content: question }, );
            if (i < responses.length) {
                const response = responses[i] || "";
                messages.push( { role: 'assistant', content: response }, );
            }
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages
        });
    
        return response.choices[0].message.content || "Something went wrong, please try again later.";
    } catch (error) {
        return handleError(error);
    }
}