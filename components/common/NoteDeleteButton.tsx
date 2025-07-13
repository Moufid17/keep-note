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
import { useNoteStore } from '@/store/noteListStore'
  

interface INoteDeleteButton {
    noteId: string
}

function NoteDeleteButton(props: INoteDeleteButton) {
    const { noteId } = props
    const {removeItem: removeNoteFromStore} = useNoteStore((state) => state)
    const [isPendingToArchiveNote, startTransitionToArchiveNote] = useTransition()

    const handleDeleteNote = () => {
        startTransitionToArchiveNote(async() => {   
            await removeNoteFromStore(noteId).then(() => {
                toast.success("Tag", {
                    position: "top-right",
                    description: `Tag has been removed.`,
                });
            }).catch((error) => {
                toast.error("Note", {
                    position: "top-center",
                    description: error.message ?? "Failed to remove tag",
                });
            })
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="cursor-pointer w-full text-red-500 hover:text-red-500 justify-start">
                    <Trash2 className="py-0"/><span className='text-left'>Delete</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this note.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Ignore</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteNote} disabled={isPendingToArchiveNote} className='bg-red-500  hover:bg-red-500'>
                        <span className="text-black hover:text-gray-600">Delete</span>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default NoteDeleteButton