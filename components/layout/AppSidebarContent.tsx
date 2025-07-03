"use client"
import {
    SidebarContent,
} from "@/components/ui/sidebar"
import NoteSideBarMenuGroup from "@/components/common/NoteSideBarMenuGroup"
import { useState } from "react";
import { NoteTagType } from "@/types/tags";
import { NoteTagSibeBarMenuGroup } from "../common/NoteTagSibeBarMenuGroup";
import { NoteType } from "@/types/notes";


export function AppSidebarContent({ notes, tags }: { notes: NoteType[], tags: NoteTagType[] }) {
    const [localNotes, setLocalNotes] = useState<NoteType[]>(notes);
    const [localTags, setLocalTags] = useState<NoteTagType[]>(tags);

    if (notes !== localNotes) setLocalNotes(notes)
    if (tags !== localTags) setLocalTags(tags)

    let notesMap: Record<string, NoteType[]> = {
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
            <NoteSideBarMenuGroup key={"notes_"+notesMap.unArchivedNotes.length} defaultOpen title={`Notes (${notesMap.unArchivedNotes.length})`} notes={notesMap.unArchivedNotes}/> 
            <NoteSideBarMenuGroup key={"archived_"+notesMap.archivedNotes.length} title={`Notes Archived (${notesMap.archivedNotes.length})`} notes={notesMap.archivedNotes}/> 
            <NoteTagSibeBarMenuGroup key={"tag_"+localTags.length} data={localTags ?? []}/>
        </SidebarContent>
    )
}