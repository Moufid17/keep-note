
"use client"
import Fuse from "fuse.js"
import {
    Sidebar,
    SidebarHeader,
} from "@/components/ui/sidebar"

import { Input } from "../ui/input"
import { User } from "@supabase/supabase-js"
import { ChangeEvent, useEffect, useState } from "react"
import { toast } from "sonner"
import { AppSidebarContent } from "./AppSidebarContent"


export type NoteListSibeBarProps = {
    id: string
    title?: string
    text: string
    isArchived: boolean
}

export function AppSidebar({user}: {user: User}) {
    
    const [initialNotes, setInitialNotes] = useState<NoteListSibeBarProps[]>([])
    const [localNotes, setLocalNotes] = useState<NoteListSibeBarProps[]>([])
    const [searchQuery, setSearchQuery] = useState<string>("")

    useEffect(() => {
        let ignore = false
        fetch(`/api/notes?email=${user.email}`).then(async (res) => {
            const data = await res.json()
            if (!ignore) {
                setInitialNotes(data.notes || [])
                setLocalNotes(data.notes || [])
            }
        }).catch((error) => {
            toast.error("Fetching notes", {
                position: "top-center",
                description: error.Message,
                duration: 6000,
            });
        })
        return () => { ignore = true; };
    }, [user, user.email])

    const fuseOptions = {
        keys: ["title"],
        threshold: 0.2,
    }
    const fuse = new Fuse(initialNotes, fuseOptions);
    
    const handleFilterNotes = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.trim().toLowerCase()
        setSearchQuery(query)
        if (query.length > 0) {
            const results = fuse.search(query)
            setLocalNotes(results.map(result => result.item))
        } else {
            setLocalNotes(initialNotes)
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
            <AppSidebarContent key={localNotes.length} notes={localNotes} />
        </Sidebar>
    )
}