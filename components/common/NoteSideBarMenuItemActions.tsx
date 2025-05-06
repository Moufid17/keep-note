// [ ] Avoid to edit multiple note title: should be one by one.
"use client"
import { useSearchParams } from "next/navigation"
import {  useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EllipsisVertical, SquarePen } from "lucide-react"
import { NoteListSibeBarProps } from "@/components/layout/AppSidebar"
import LoadingIndicator from "@/components/common/loading-indicator"
import { Input } from "@/components/ui/input"
import useNote from "@/hooks/useNote"
import { updateNoteTitleAction } from "@/app/actions/notes"
import NoteDeleteButton from "./NoteDeleteButton"

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

    const [isPendingToUpdateNoteTitle, startTransitionToUpdateNoteTitle] = useTransition()
    const [isLoading, setLoading] = useState(false)
    
    useEffect(() => {
        if (noteId === note.id) {
            setLocaleNoteText(selectedNoteText);
        }  
    }, [noteId, selectedNoteText, note.id]);

    let noteText = localedNoteText || "EMPTY NOTE";
    let noteTitle = localNoteTitle || note.text.slice(0, 20);

    const handleRenameNote = () => {
        startTransitionToUpdateNoteTitle(async() => {
            const error = await updateNoteTitleAction(note.id, localNoteTitle)
            if (error?.errorMessage) {
                toast.error(error.errorMessage)
            } else {
                toast.success("Note renamed successfully")
            }
        })
        if (!isPendingToUpdateNoteTitle) setLoading(false)
    }

    if (isLoading) {
        return (<Input
            type="text"
            value={noteTitle}
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
                <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem onClick={() => setLoading(true)} className="cursor-pointer justify-center">
                        <SquarePen /><span>Rename</span>
                    </DropdownMenuItem>
                    <NoteDeleteButton noteId={note.id} onDeleteLocally={onDeleteLocally} />
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    )
}
export default NoteSideBarMenuItemActions