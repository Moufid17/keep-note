"use client"
import {
    SidebarContent,
} from "@/components/ui/sidebar"
import NoteSideBarMenuGroup from "@/components/common/NoteSideBarMenuGroup"
import { useEffect, useMemo } from "react";
import { NoteTagSibeBarMenuGroup } from "../common/NoteTagSibeBarMenuGroup";
import { useNoteStore } from "@/store/noteListStore";
import { useTagStore } from "@/store/tagListStore";
import Fuse from "fuse.js";


export function AppSidebarContent() {
    const {items: noteStoreList, getItems: getNoteStoreList } = useNoteStore((state) => state) 
    const {items: tagStoreList, getItems: getTagStoreList } = useTagStore((state) => state)

    useEffect(() => {
        let ignore = false
        const fetchNotes = async () => await getNoteStoreList()
        const fetchTags = async () => await getTagStoreList()
        if (!ignore) {
            fetchNotes()
            fetchTags()
        }
        return () => { ignore = true; };
    }, [getNoteStoreList, getTagStoreList])

    const archivedItems = useMemo(() => noteStoreList.filter(item => item.isArchived), [noteStoreList]);
    const unarchivedItems = useMemo(() => noteStoreList.filter(item => !item.isArchived), [noteStoreList]);

    const fuseOptions = {
        keys: ["title", "tagId"],
        threshold: 0.2,
    }
    const fuse = new Fuse(noteStoreList, fuseOptions);
    
    return (
        <SidebarContent>
            <NoteSideBarMenuGroup key={"notes_"+unarchivedItems.length} defaultOpen title={`Notes (${unarchivedItems.length})`} notes={unarchivedItems}/> 
            <NoteSideBarMenuGroup key={"archived_"+archivedItems.length} title={`Notes Archived (${archivedItems.length})`} notes={archivedItems}/> 
            <NoteTagSibeBarMenuGroup key={"tag_"+tagStoreList.length} data={tagStoreList}/>
        </SidebarContent>
    )
}