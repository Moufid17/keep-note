import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
} from "@/components/ui/sidebar"

import { prismaClient } from "@/db/prisma"
import { getUser } from "@/auth/server"
import Link from "next/link"
import NoteSideBarMenuGroup from "@/components/common/NoteSideBarMenuGroup"


export type NoteListSibeBarProps = {
    id: string
    title?: string
    text: string
    isArchived: boolean
}

export async function AppSidebar() {
    const user = await getUser();

    if (!user) return <></>

    let notes: NoteListSibeBarProps[] = []
    notes = await prismaClient.note.findMany({
        where: { author: {email: user.email}, },
        select: {
            id: true,
            title: true,
            text: true,
            isArchived: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    })
    let notesMap: Record<string, NoteListSibeBarProps[]> = {
        unArchivedNotes : [],
        archivedNotes : [],
    }
    notesMap = notes.reduce((acc, currentNote) => {
        currentNote.isArchived ? acc["archivedNotes"].push(currentNote) : acc["unArchivedNotes"].push(currentNote)
        return acc
    }, notesMap)
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center justify-between px-4 py-2">
                    {!user && <p> <Link href="/login" className="underline">Login</Link>{" "} to see your notes </p> }
                </div>
            </SidebarHeader>
            {user && (
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarGroupContent>
                                <NoteSideBarMenuGroup defaultOpen title={`Notes (${notesMap.unArchivedNotes.length})`} notes={notesMap.unArchivedNotes}/> 
                            </SidebarGroupContent>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarGroupContent>
                                <NoteSideBarMenuGroup title={`Notes Archived (${notesMap.archivedNotes.length})`} notes={notesMap.archivedNotes}/> 
                            </SidebarGroupContent>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            )}
            <SidebarFooter />
        </Sidebar>
    )
}