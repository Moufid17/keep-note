"use client"
import { useEffect, useState, useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { toast } from "sonner"
import { updateNoteArchiveAction } from '@/app/actions/notes'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '../ui/button'
  

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
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="cursor-pointer w-full text-brand-500 hover:text-brand-500 ">
                    <Trash2 className="py-0"/><span className='text-left'>Delete</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently archive this note.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Ignore</AlertDialogCancel>
                <AlertDialogAction onClick={handleArchiveNote} disabled={isPendingToArchiveNote} className='bg-brand-500 text-black hover:bg-brand-500 hover:text-black'>
                    <span className="text-black">Delete</span>
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default NoteDeleteButton