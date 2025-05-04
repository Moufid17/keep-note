"use server"
import { getUser } from '@/auth/server';
import { prismaClient } from '@/db/prisma'
import { handleError } from '@/lib/utils';

export const createNoteAction = async (noteId: string) => {
    try {
        if (noteId.length <= 0) throw new Error("Note ID is required");

        const user = await getUser();
        if (!user) throw new Error("User not found");
    
        await prismaClient.note.create({
            data: {
                id: noteId,
                // title: "",
                text: "",
                authorId: user.id,
            }
        })
        return {errorMessage: null}
    } catch (error) {
        handleError(error);
    }
}

export const updateNoteAction = async (noteId: string, text: string) => {
    try {
        if (noteId.length <= 0) throw new Error("Note ID is required");
        if (text.length <= 0) throw new Error("Text is required");

        const user = await getUser();
        if (!user) throw new Error("You must be logged in to update a note");
    
        await prismaClient.note.update({
            where: { id: noteId },
            data: { text },
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