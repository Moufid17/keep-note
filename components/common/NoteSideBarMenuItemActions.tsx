"use client"
import { useSearchParams } from "next/navigation"
import {  useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EllipsisVertical, SquarePen, XIcon } from "lucide-react"
import LoadingIndicator from "@/components/common/loading-indicator"
import { Input } from "@/components/ui/input"
import useNote from "@/hooks/useNote"
import NoteDeleteButton from "./NoteDeleteButton"
import { Button } from "@/components/ui/button"
import { updateNoteTitleAction } from "@/app/actions/notes"
import NoteRestoreButton from "./NoteRestoreButton"
import NoteArchiveButton from "./NoteArchiveButton"
import TagIcon from "../ui/TagIcon"
import { useTagStore } from "@/store/tagListStore"
import { NoteTagType } from "@/types/tags"
import { NoteType } from "@/types/notes"
import NoteChangeTagButton from "./NoteChangeTagButton"
interface INoteSideBar {
    note: NoteType
    editingNoteId: string|null
    setEditingNoteId: (id: string|null) => void
    onRemoveLocally?: () => void
}

const NoteSideBarMenuItemActions = (props: INoteSideBar) => {
    const noteId = useSearchParams().get("noteid") ?? ""
    const { note, editingNoteId, setEditingNoteId, onRemoveLocally } = props
    
    const { noteText: selectedNoteText } = useNote();
    const [localedNoteText, setLocaleNoteText] = useState<string>(note.text)
    const [localNoteTitle, setNoteTitle] = useState<string>(note.title ?? "")

    const [isPendingToUpdateNoteTitle, startTransitionToUpdateNoteTitle] = useTransition()
    const [isLoading, setLoading] = useState(false)

    const {items: storeTags} = useTagStore((state) => state)
    const tag: NoteTagType | undefined = storeTags.find(tag => tag.id === note.tagId)
    
    useEffect(() => {
        if (noteId === note.id) {
            setLocaleNoteText(selectedNoteText);
        }  
    }, [noteId, selectedNoteText, note.id]);

    const noteText = localedNoteText || "EMPTY NOTE";

    const handleRenameNote = () => {
        // If the note title is the same as the current title, do not update
        if (localNoteTitle.trim().toLowerCase() === note.title?.trim().toLowerCase()) {
            setLoading(false)
            setEditingNoteId(null)
            return
        }
        startTransitionToUpdateNoteTitle(async() => {
            const error = await updateNoteTitleAction(note.id, localNoteTitle)
            if (error?.errorMessage) {
                toast.error("Note", {
                    position: "top-right",
                    description: error.errorMessage
                });
            } else {
                toast.success("Note", {
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

    const handleOnClickNote = () => {
        setNoteTitle(localNoteTitle.length > 0 ? localNoteTitle : noteText.slice(0,20))
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
                    <Link href={`/notes/?noteid=${note.id}&tagid=${note.tagId}`} onClick={handleOnClickNote}>
                        <LoadingIndicator /> {tag && <TagIcon color={tag?.color}/>}
                        <p className="truncate">{localNoteTitle.length > 0 ? localNoteTitle : noteText.slice(0, 20)}</p>
                    </Link>
                </SidebarMenuButton>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuAction key={note.id}>
                            <EllipsisVertical className={`${noteId === note.id && "text-black"}`}/>
                        </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom">
                        <NoteChangeTagButton noteId={note.id} tagId={tag?.id}/> 
                        <DropdownMenuItem className="cursor-pointer justify-start" onClick={() => {
                                setLoading(true)
                                setEditingNoteId(note.id)
                            }}
                        >
                            <SquarePen /><span>Rename</span>
                        </DropdownMenuItem>
                        { note.isArchived ? 
                            ((<NoteRestoreButton noteId={note.id} onRemoveFromList={onRemoveLocally} />))
                        :
                            (<NoteArchiveButton noteId={note.id} onRemoveFromList={onRemoveLocally} />)
                        }
                        <NoteDeleteButton noteId={note.id} onRemoveFromList={onRemoveLocally} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>)
        }
       </>
    )
}
export default NoteSideBarMenuItemActions