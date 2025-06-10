import React from 'react'
import { Toaster } from "@/components/ui/sonner";
import NoteProvider from '@/providers/NoteProvider'
import AskAIMenu from "@/components/common/AskAIMenu";
import NewNoteButton from "@/components/common/NewNoteButton";
import NoteTextArea from "@/components/common/NoteTextArea";
import { generateNoteId } from "@/lib/utils";
import { prismaClient } from "@/db/prisma";
import { getUser } from "@/auth/server";
import { AppSidebar } from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';


type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function HomePage({ searchParams }: Props){
    const user = await getUser();
    const nodeIdParam = (await searchParams).noteId || "";
    
    let noteId = (Array.isArray(nodeIdParam)) ? nodeIdParam[0] : nodeIdParam;
    if (noteId.length === 0) noteId = generateNoteId()

    const note = await prismaClient.note.findUnique({
        where: {
            id: noteId, 
            author: { email: user?.email }  
        },
        select: {
            text: true,
        }
    });
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="overflow-hidden pt-0">
                <Header />
                <NoteProvider>
                    <div className="flex flex-col items-center w-full h-[85vh] mt-12">
                        <div className="w-full max-w-4xl flex flex-col justify-center gap-4 p-2">
                            <div className="flex gap-4 justify-end items-center">
                            <AskAIMenu />
                            <NewNoteButton user={user}/>
                            </div>
                            <NoteTextArea noteId={noteId} startingNoteText={note ? note.text : ""}/>       
                        </div>
                    </div>
                    <Toaster richColors/>
                </NoteProvider>
            </SidebarInset>
        </SidebarProvider>
    )
}
