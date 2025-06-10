import { prismaClient } from "@/db/prisma";
import { generateNoteId } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("email") || "";
    
    const note = await prismaClient.note.create({
        data: {
            id: generateNoteId(),
            text: "",
            title: "",
            author: {
                connect: {
                    email: userEmail,
                }
            }
        },
    })

    return NextResponse.json({
        noteId: note.id,
    });
}