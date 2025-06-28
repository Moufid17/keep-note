"use client"
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
} from "@/components/ui/sidebar"
import NoteSideBarMenuGroup from "@/components/common/NoteSideBarMenuGroup"
import { NoteListSibeBarProps } from "./AppSidebar"
import { useState } from "react";


export function AppSidebarContent({ notes }: { notes: NoteListSibeBarProps[] }) {
    const [localNotes, setLocalNotes] = useState<NoteListSibeBarProps[]>(notes);
    if (notes !== localNotes) {
        setLocalNotes(notes);
    }

    let notesMap: Record<string, NoteListSibeBarProps[]> = {
        unArchivedNotes : [],
        archivedNotes : [],
    }
    notesMap = notes.reduce((acc, currentNote) => {
        if (currentNote.isArchived)  {
            acc["archivedNotes"].push(currentNote)
        } else {
            acc["unArchivedNotes"].push(currentNote)
        }
        return acc
    }, notesMap)
    
    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarGroupContent>
                        <NoteSideBarMenuGroup key={notesMap.unArchivedNotes.length} defaultOpen title={`Notes (${notesMap.unArchivedNotes.length})`} notes={notesMap.unArchivedNotes}/> 
                    </SidebarGroupContent>
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarGroupContent>
                        <NoteSideBarMenuGroup key={notesMap.archivedNotes.length} title={`Notes Archived (${notesMap.archivedNotes.length})`} notes={notesMap.archivedNotes}/> 
                    </SidebarGroupContent>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    )
}