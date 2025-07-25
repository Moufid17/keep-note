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
  

interface INoteRestoreButton {
    noteId: string
}

function NoteRestoreButton(props: INoteRestoreButton) {
    const { noteId } = props
    const [isPendingToArchiveNote, startTransitionToArchiveNote] = useTransition()

    const {items: noteStoreList, updateItem: updateNoteStoreList} = useNoteStore((state) => state)

    const handleRestoreNote = () => {
        startTransitionToArchiveNote(async() => {   
            // Update the local store to reflect the change immediately
            const note = noteStoreList.find((note) => note.id === noteId)
            if (!note) {
                toast.error("Note", {
                    position: "top-right",
                    description: "Note not exist"
                });
                return
            }
            const {id, ...data} = note
            await updateNoteStoreList(id, { ...data, isArchived: false }).then(() => {
                toast.success("Note", {
                    position: "top-right",
                    description: "Note restored successfully"
                });
            }).catch((error) => {
                toast.error("Note", {
                    position: "top-center",
                    description: error.message ?? "Failed to update note in store",
                    duration: 6000
                });
            })
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="cursor-pointer w-full text-brand-500 hover:text-brand-500 justify-start">
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