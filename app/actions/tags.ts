"use server"
import { prismaClient } from "@/db/prisma";
import { ErrorResponse, handleError } from "@/lib/utils";
import { getUser } from '@/auth/server';
import { noteTagSchema, NoteTagType } from "@/types/tags";


export const getTagsAction = async () : Promise<ErrorResponse| NoteTagType[]>=> {
    try {
        const currentUser = await existingUser()
        const tags : NoteTagType[] = await prismaClient.tag.findMany({
            where: { authorId: currentUser.id },
            select: {
                id: true,
                name: true,
                color: true,
            },
            orderBy: {
                createdAt: 'asc',
            }
        })
        noteTagSchema.array().safeParse(tags)
        return tags
    } catch (error) {
        return handleError(error);
    }
}


export const createTagAction = async (tagId: string, name:string, color:string) => {
    try {
        if (tagId.length <= 0) throw new Error("Note ID is required");

        const currentUser = await existingUser()
    
        const tag = await prismaClient.tag.create({
            data: {
                id: tagId,
                name: name,
                color: color,
                authorId: currentUser.id,
            }
        })
        return {errorMessage: null}
    } catch (error) {
        return handleError(error);
    }
}

export const updateTagAction = async (tagId: string, name: string, color="") : Promise<ErrorResponse| NoteTagType> => {
    try {
        if (tagId.length <= 0) throw new Error("Tag ID is required");
        if (name.length <= 0 && color.length < 0) throw new Error("Name  and color are required");

        await existingUser()
    
        const result: NoteTagType = await prismaClient.tag.update({
            where: { id: tagId },
            data: { name , color },
            select: {
                id: true,
                name: true,
                color: true,
            }
        })
        const parsedResult = noteTagSchema.safeParse(result);
        if (!parsedResult.success) {
            throw new Error("Invalid tag data");
        }
        return parsedResult.data;
    
    } catch (error) {
        return handleError(error);
    }
}

export const deleteTagAction = async (tagId: string) => {
    try {
        if (tagId.length <= 0) throw new Error("Note ID is required");

       const currentUser = await existingUser()
    
        await prismaClient.tag.delete({
            where: { id: tagId, authorId: currentUser.id },
        });
    
        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
};

const existingUser = async ()  => {
    // User from supabase auth
    const user = await getUser();
    if (!user) throw new Error("User not found");

    // User from database
    const existingUser = await prismaClient.user.findUnique({
        where: { email: user.email },
        select: {
            id: true,
        }
    });
    if (!existingUser) throw new Error("User not found");
    return existingUser;
};