"use client"
import { useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { toast } from "sonner"
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
import { Button } from '@/components/ui/button'
import { updateNoteArchiveAction } from '@/app/actions/notes'
  

interface INoteDeleteButton {
    noteId: string
    onDeleteLocally?: () => void
}

function NoteRestoreButton(props: INoteDeleteButton) {
    const { noteId, onDeleteLocally } = props
    const [isPendingToArchiveNote, startTransitionToArchiveNote] = useTransition()

    const handleRestoreNote = () => {
        startTransitionToArchiveNote(async() => {   
            const error = await updateNoteArchiveAction(noteId) // Default isArchive=false, so it will restore the note
            if (error?.errorMessage) {
                toast.error("Note", {
                    position: "top-right",
                    description: error.errorMessage
                });
            } else {
                if (onDeleteLocally) onDeleteLocally()
                toast.success("Note", {
                    position: "top-right",
                    description:"Note restore successfully"
                });
            }
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="cursor-pointer w-full text-brand-500 hover:text-brand-500">
                    <Trash2 className="py-0"/><span className='text-left'>Restore</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will restore this note.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Ignore</AlertDialogCancel>
                <AlertDialogAction onClick={handleRestoreNote} disabled={isPendingToArchiveNote} className='bg-brand-500 text-black hover:bg-brand-500 hover:text-black'>
                    <span className="text-black">Restore</span>
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default NoteRestoreButton