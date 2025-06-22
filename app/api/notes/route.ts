import { prismaClient } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("email") || "";

  if (!userEmail) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  const noteList = await prismaClient.note.findMany({
        where: { author: {email: userEmail}, },
        select: {
          id: true,
          title: true,
          text: true,
          isArchived: true,
        },
        orderBy: {
          createdAt: "desc",
        },
    });

  return NextResponse.json({
    notes: noteList,
  });
}