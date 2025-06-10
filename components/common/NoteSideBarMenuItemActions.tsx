// [ ] Avoid to edit multiple note title: should be one by one.
"use client"
import { useSearchParams } from "next/navigation"
import {  useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EllipsisVertical, SquarePen, XIcon } from "lucide-react"
import { NoteListSibeBarProps } from "@/components/layout/AppSidebar"
import LoadingIndicator from "@/components/common/loading-indicator"
import { Input } from "@/components/ui/input"
import useNote from "@/hooks/useNote"
import NoteDeleteButton from "./NoteDeleteButton"
import { Button } from "@/components/ui/button"
import { updateNoteTitleAction } from "@/app/actions/notes"
import NoteRestoreButton from "./NoteRestoreButton"
interface INoteSideBar {
    note: NoteListSibeBarProps
    editingNoteId: string|null
    setEditingNoteId: (id: string|null) => void
    onDeleteLocally?: () => void
}

const NoteSideBarMenuItemActions = (props: INoteSideBar) => {
    const noteId = useSearchParams().get("noteId") ?? ""
    const { note, editingNoteId, setEditingNoteId, onDeleteLocally } = props
    
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

    const noteText = localedNoteText || "EMPTY NOTE";

    const handleRenameNote = () => {
        startTransitionToUpdateNoteTitle(async() => {
            const error = await updateNoteTitleAction(note.id, localNoteTitle)
            if (error?.errorMessage) {
                toast.error("Note", {
                    icon: "❌",
                    position: "top-right",
                    description: error.errorMessage
                });
            } else {
                toast.success("Note", {
                    icon: "✅",
                    position: "top-right",
                    description:"Note renamed successfully"
                });
            }
        })
        if (!isPendingToUpdateNoteTitle) {
            setLoading(false)
            setEditingNoteId(null)
        }
    }

    if (isLoading && editingNoteId === note.id) {
        return (
        <div className="relative w-full max-w-sm">
            <Input type="text"
                value={localNoteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Rename note"
                className="w-full bg-transparent text-sm text-muted-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-brand-500"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleRenameNote()
                    }
                }}
                autoFocus={isLoading && editingNoteId === note.id}
            />
            <Button type="button" variant="ghost" size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                onClick={() => { 
                    setNoteTitle(note.title ?? localNoteTitle)
                    setLoading(false)
                    setEditingNoteId(null)
                }}
            >
                <XIcon className="h-4 w-4"/><span className="sr-only">Clear</span>
            </Button>
        </div>
        )
    }

    return (
       <>
         {!isLoading && editingNoteId !== note.id && (
            <SidebarMenuItem>
                <SidebarMenuButton asChild className={`${noteId === note.id && "bg-brand-100 text-black"} cursor-pointer }`}>
                    <Link href={`/notes/?noteId=${note.id}`} onClick={() => setNoteTitle(localNoteTitle.length > 0 ? localNoteTitle : noteText)}><LoadingIndicator /><p className="truncate">{localNoteTitle.length > 0 ? localNoteTitle : noteText}</p></Link>
                </SidebarMenuButton>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuAction key={note.id} onClick={() => {}}>
                            <EllipsisVertical className={`${noteId === note.id && "text-black"}`}/>
                        </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem className="cursor-pointer justify-center" onClick={() => {
                                setLoading(true)
                                setEditingNoteId(note.id)
                            }}
                        >
                            <SquarePen /><span>Rename</span>
                        </DropdownMenuItem>
                        { note.isArchived ? 
                            ((<NoteRestoreButton noteId={note.id} onDeleteLocally={onDeleteLocally} />))
                        :
                            (<NoteDeleteButton noteId={note.id} onDeleteLocally={onDeleteLocally} />)
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>)
        }
       </>
    )
}
export default NoteSideBarMenuItemActions