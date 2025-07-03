"use server"
import { prismaClient } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import { getUser } from '@/auth/server';


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

export const updateTagAction = async (tagId: string, name: string, color="") => {
    try {
        if (tagId.length <= 0) throw new Error("Tag ID is required");
        if (name.length <= 0 && color.length < 0) throw new Error("Name  and color are required");

        await existingUser()
    
        await prismaClient.tag.update({
            where: { id: tagId },
            data: { name , color },
        });
    
        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
};

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