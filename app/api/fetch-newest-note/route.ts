import { prismaClient } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("email") || "";

  const newestNoteId = await prismaClient.note.findFirst({
    where: {
        author:{email: userEmail},
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      tagId: true,
    },
  });

  return NextResponse.json({
    newestNoteId: newestNoteId?.id,
    newestNoteTagId: newestNoteId?.tagId || null,
  });
}