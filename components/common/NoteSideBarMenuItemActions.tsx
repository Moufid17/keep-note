"use client"
import { useSearchParams } from "next/navigation"
import {  useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Archive, EllipsisVertical, SquarePen, Trash2 } from "lucide-react"
import { NoteListSibeBarProps } from "@/components/layout/AppSidebar"
import useNote from "@/hooks/useNote"
import LoadingIndicator from "./loading-indicator"

interface NoteSideBarProps {
    note: NoteListSibeBarProps
    onDeleteLocally?: () => void
}

const NoteSideBarMenuItemActions = (props: NoteSideBarProps) => {
    const noteId = useSearchParams().get("noteId") ?? ""
    const { note, onDeleteLocally } = props
    
    const { noteText: selectedNoteText } = useNote();
    const [localedNoteText, setLocaleNoteText] = useState<string>(note.text);

    useEffect(() => {
        if (noteId === note.id) {
            setLocaleNoteText(selectedNoteText);
        }  
    }, [noteId, selectedNoteText, note.id]);

    let noteText = localedNoteText || "EMPTY NOTE";

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild className={`${noteId === note.id && "bg-brand-100 text-black"}`}>
                <Link href={`/?noteId=${note.id}`}><LoadingIndicator /><p className="truncate">{noteText}</p></Link>
            </SidebarMenuButton>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction>
                        <EllipsisVertical className={`${noteId === note.id && "text-black"}`}/>
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem>
                        <SquarePen /><span>Rename</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Archive /><span>Archive</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDeleteLocally}>
                        <Trash2 className="text-red-500"/><span className="text-red-500">Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    )
}
export default NoteSideBarMenuItemActions