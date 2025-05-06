"use client"
import { useSearchParams } from "next/navigation"
import {  useEffect, useMemo, useState, useTransition } from "react"
import Link from "next/link"
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Archive, EllipsisVertical, SquarePen, Trash2 } from "lucide-react"
import { NoteListSibeBarProps } from "@/components/layout/AppSidebar"
import useNote from "@/hooks/useNote"
import LoadingIndicator from "./loading-indicator"
import { updateNoteTitleAction } from "@/app/actions/notes"
import { toast } from "sonner"
import { Input } from "../ui/input"

interface NoteSideBarProps {
    note: NoteListSibeBarProps
    onDeleteLocally?: () => void
}

const NoteSideBarMenuItemActions = (props: NoteSideBarProps) => {
    const noteId = useSearchParams().get("noteId") ?? ""
    const { note, onDeleteLocally } = props
    const { noteText: selectedNoteText } = useNote();
    const [localedNoteText, setLocaleNoteText] = useState<string>(note.text)
    const [localNoteTitle, setNoteTitle] = useState<string>(note.title ?? "")

    const [isPending, startTransition] = useTransition()
    const [isLoading, setLoading] = useState(false)
    
    useEffect(() => {
        if (noteId === note.id) {
            setLocaleNoteText(selectedNoteText);
        }  
    }, [noteId, selectedNoteText, note.id]);

    let noteText = localedNoteText || "EMPTY NOTE";

    const handleRenameNote = () => {
        startTransition(async() => {
            const error = await updateNoteTitleAction(note.id, localNoteTitle)
            if (error?.errorMessage) {
                toast.error(error.errorMessage)
            } else {
                toast.success("Note renamed successfully")
            }
        })
        if (!isPending) setLoading(false)
    }

    if (isLoading) {
        return (<Input
            type="text"
            value={localNoteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Rename note"
            className="w-full bg-transparent text-sm text-muted-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-brand-500"
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleRenameNote()
                }
            }}
            autoFocus
        />)
    }
    
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild className={`${noteId === note.id && "bg-brand-100 text-black"} cursor-pointer`}>
                <Link href={`/?noteId=${note.id}`}><LoadingIndicator /><p className="truncate">{localNoteTitle.length > 0 ? localNoteTitle : noteText}</p></Link>
            </SidebarMenuButton>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction >
                        <EllipsisVertical className={`${noteId === note.id && "text-black"}`}/>
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                {<DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem onClick={() => setLoading(true)} className="cursor-pointer">
                        <SquarePen /><span>Rename</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDeleteLocally}>
                        <Trash2 className="text-brand-500"/><span className="text-brand-500 cursor-pointer">Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>}
            </DropdownMenu>
        </SidebarMenuItem>
    )
}
export default NoteSideBarMenuItemActions