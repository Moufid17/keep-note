import { prismaClient } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("email") || "";

  if (!userEmail) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await prismaClient.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const tagList = await prismaClient.tag.findMany({
        where: { authorId: user.id },
        select: {
          id: true,
          name: true,
          color: true,
        },
    });

  return NextResponse.json({
    tags: tagList,
  });
}