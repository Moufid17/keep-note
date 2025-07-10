import React from 'react'

import { redirect } from 'next/navigation'
import { prismaClient } from "@/db/prisma";
import { getUser } from "@/auth/server";
import { generateNoteId } from "@/lib/utils";
import NoteProvider from '@/providers/NoteProvider'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AppHeader from '@/components/layout/AppHeader';
import { AppSidebar } from '@/components/layout/AppSidebar';
import NoteTextArea from "@/components/common/NoteTextArea";
import AskAIMenu from "@/components/common/AskAIMenu";
import NewNoteButton from "@/components/common/NewNoteButton";


type PropsType = {
  searchParams: Promise<{
    noteid?: string
    tagid?: string
    tags?:string
    query?: string
  }>;
};

export default async function HomePage(props : PropsType){
    const user = await getUser();
    if (!user) redirect('/login')
    
    const searchParams = await props.searchParams;
    
    const noteIdParam = searchParams.noteid || "";
    
    let noteId = noteIdParam;
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
        <NoteProvider>
            <SidebarProvider>
                <AppSidebar key={user.id}/>
                <SidebarInset className="overflow-hidden pt-0">
                    <AppHeader />
                    <div className="flex flex-col items-center w-full h-[85vh] mt-34">
                        <div className="w-full max-w-4xl flex flex-col justify-center gap-4 p-2">
                            <div className="flex gap-4 justify-end items-center">
                                <AskAIMenu />
                                <NewNoteButton key={noteId}/>
                            </div>
                            <NoteTextArea key={noteId} noteId={noteId} startingNoteText={note ? note.text : ""}/>       
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </NoteProvider>
    )
}
