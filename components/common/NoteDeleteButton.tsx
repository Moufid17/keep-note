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

function NoteDeleteButton(props: INoteDeleteButton) {
    const { noteId, onDeleteLocally } = props
    const [isPendingToArchiveNote, startTransitionToArchiveNote] = useTransition()

    const handleArchiveNote = () => {
        startTransitionToArchiveNote(async() => {   
            const error = await updateNoteArchiveAction(noteId, true)
            if (error?.errorMessage) {
                toast.error(error.errorMessage)
            } else {
                if(onDeleteLocally) onDeleteLocally()
                toast.success("Note archived successfully")
            }
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="cursor-pointer w-full text-red-500 hover:text-red-500">
                    <Trash2 className="py-0"/><span className='text-left'>Archive</span>
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
                <AlertDialogAction onClick={handleArchiveNote} disabled={isPendingToArchiveNote} className='bg-red-500  hover:bg-red-500'>
                    <span className="text-black hover:text-gray-600">Archive</span>
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default NoteDeleteButton