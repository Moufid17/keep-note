"use server"
import { getUser } from '@/auth/server';
import { prismaClient } from '@/db/prisma'
import { ErrorResponse, handleError } from '@/lib/utils';
import { noteSchema, NoteType, schemaNoteAskAIAction } from '@/types/notes';

import {OpenAI} from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';


const existingUser = async ()  => {
    // User from supabase auth
    const user = await getUser();
    if (!user) throw new Error("User not found");

    // User from database
    const existingUser = await prismaClient.user.findUnique({
        where: { email: user.email },
        select: {
            id: true,
            email: true,
        }
    });
    if (!existingUser) throw new Error("User not found");
    return existingUser;
};

export const getNotesAction = async () : Promise<ErrorResponse| NoteType[]>=> {
    try {
        const currentUser = await existingUser()
        const notes : NoteType[] = await prismaClient.note.findMany({
            where: { author: {email: currentUser.email}, },
            select: {
                id: true,
                title: true,
                text: true,
                tagId: true,
                isArchived: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        noteSchema.array().safeParseAsync(notes)
        return notes
    } catch (error) {
        return handleError(error);
    }
}

export const createNoteAction = async (noteId: string) => {
    try {
        if (noteId.length <= 0) throw new Error("Note ID is required");

        const currentUser = await existingUser()
    
        await prismaClient.note.create({
            data: {
                id: noteId,
                // title: "",
                text: "",
                authorId: currentUser.id,
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

        await existingUser()
    
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

        await existingUser()
    
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

        await existingUser()
    
        await prismaClient.note.update({
            where: { id: noteId },
            data: { isArchived: isArchive },
        });
    
        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
};

export const updateNoteTagAction = async (noteId: string, tagId:string) => {
    try {
        if (noteId.length <= 0) throw new Error("Note ID is required")
        if (tagId.length <= 0) throw new Error("Tag ID is required");

        await existingUser()
    
        await prismaClient.note.update({
            where: { id: noteId },
            data: { tagId },
        });
    
        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
}

export const updateNoteActionDev = async (id: string, title: string="", text:string="", archived:boolean=false, tagId:string|null=null) : Promise<ErrorResponse| NoteType> => {
    try {
        const parsedData = noteSchema.safeParse({ id, title, text, isArchived: archived, tagId });
        if (!parsedData.success) {
            const errorMessages = parsedData.error.errors.map(err => err.message).join(", ");
            throw new Error(`Validation failed: ${errorMessages}`);
        }

        const { id: noteId, title: noteTitle, text: noteText, isArchived, tagId: noteTagId } = parsedData.data

        await existingUser()
        const result : NoteType = await prismaClient.note.update({
            where: { id: noteId },
            data: { 
                title: noteTitle,
                text: noteText,
                isArchived,
                tagId: noteTagId,
            },
            select: {
                id: true,
                title: true,
                text: true,
                isArchived: true,
                tagId: true,
            }
        });
    
        const parsedResult = noteSchema.safeParse(result);
        if (!parsedResult.success) throw new Error("Invalid tag data")

        return parsedResult.data;
    } catch (error) {
        return handleError(error);
    }
}
  
export const deleteNoteAction = async (noteId: string) => {
    try {
        if (noteId.length <= 0) throw new Error("Note ID is required");

        const currentUser = await existingUser()
    
        await prismaClient.note.delete({
            where: { id: noteId, authorId: currentUser.id },
        });
    
        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
};

export const askAIAction = async (noteId: string, questions: string[], responses: string[]) => {
    try {
        // Validate inputs
        const parsedData = schemaNoteAskAIAction.safeParse({ noteId, questions, responses });
        if (!parsedData.success) {
            const errorMessages = parsedData.error.errors.map(err => err.message).join(", ");
            throw new Error(`Validation failed: ${errorMessages}`);
        }
        noteId = parsedData.data.noteId;
        questions = parsedData.data.questions;
        responses = parsedData.data.responses;

        const currentUser = await existingUser()
    
        const note = await prismaClient.note.findUnique({
            where: { id: noteId, author: {
                email: currentUser.email,
            } },
            select: { text: true, createdAt: true, updatedAt: true },
        });
    
        if (!note) {
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