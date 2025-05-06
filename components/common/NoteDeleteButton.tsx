"use client"
import { useEffect, useState, useTransition } from 'react'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { Trash2 } from 'lucide-react'
import { toast } from "sonner"
import { updateNoteArchiveAction } from '@/app/actions/notes'
import { NoteListSibeBarProps } from '../layout/AppSidebar'

interface INoteDeleteButton {
    noteId: string
    onDeleteLocally?: () => void
}

function NoteDeleteButton(props: INoteDeleteButton) {
    const { noteId, onDeleteLocally } = props
    const [localNoteId, setLocalNoteId] = useState<string>(noteId)
    const [isPendingToArchiveNote, startTransitionToArchiveNote] = useTransition()

    useEffect(() => {
        if (noteId) {
            setLocalNoteId(noteId)
        }
    }, [noteId])

    const handleArchiveNote = () => {
        startTransitionToArchiveNote(async() => {
            const error = await updateNoteArchiveAction(localNoteId, true)
            if (error?.errorMessage) {
                toast.error(error.errorMessage)
            } else {
                toast.success("Note archived successfully")
            }
        })
        if (!isPendingToArchiveNote && onDeleteLocally) onDeleteLocally()
    }

    return (
        <DropdownMenuItem onClick={handleArchiveNote} className="cursor-pointer">
            <Trash2 className="text-brand-500"/><span className="text-brand-500">Delete</span>
        </DropdownMenuItem>
    )
}

export default NoteDeleteButton