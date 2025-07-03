
"use client"
import Fuse from "fuse.js"
import {
    Sidebar,
    SidebarHeader,
} from "@/components/ui/sidebar"

import { Input } from "../ui/input"
import { User } from "@supabase/supabase-js"
import { ChangeEvent, useEffect, useState } from "react"
import { AppSidebarContent } from "./AppSidebarContent"
import { useTagStore } from "@/store/tagListStore"
import { useNoteStore } from "@/store/noteListStore"
import { NoteType } from "@/types/notes"

export function AppSidebar({user}: {user: User}) {

    const [localNotes, setLocalNotes] = useState<NoteType[]>([])
    const [searchQuery, setSearchQuery] = useState<string>("")
    
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
    }, [user])

    useEffect(() => {
        if (noteStoreList.length > 0) {
            setLocalNotes(noteStoreList)
        }
    }, [noteStoreList])

    const fuseOptions = {
        keys: ["title"],
        threshold: 0.2,
    }
    const fuse = new Fuse(noteStoreList, fuseOptions);
    
    const handleFilterNotes = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.trim().toLowerCase()
        setSearchQuery(query)
        if (query.length > 0) {
            const results = fuse.search(query)
            setLocalNotes(results.map(result => result.item))
        } else {
            setLocalNotes(noteStoreList)
        }
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center justify-between px-1 py-2">
                    <Input autoFocus type="text" placeholder="Search note(s)" className='placeholder:italic' 
                        value={searchQuery} onChange={handleFilterNotes}
                    />
                </div>
            </SidebarHeader>
            <AppSidebarContent key={"appside_"+localNotes.length+tagStoreList.length} notes={localNotes} tags={tagStoreList}/>
        </Sidebar>
    )
}