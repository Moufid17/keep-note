"use server"
import { getUser } from '@/auth/server';
import { prismaClient } from '@/db/prisma'
import { handleError } from '@/lib/utils';

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