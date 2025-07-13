"use client"
import { useTransition } from 'react'
import { Archive } from 'lucide-react'
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
  

interface INoteArchiveButton {
    noteId: string
}

function NoteArchiveButton(props: INoteArchiveButton) {
    const { noteId } = props
    const [isPendingToArchiveNote, startTransitionToArchiveNote] = useTransition()

    const {items: noteStoreList, updateItem: updateNoteStoreList} = useNoteStore((state) => state)

    const handleArchiveNote = () => {
        startTransitionToArchiveNote(async() => {   
            const note = noteStoreList.find((note) => note.id === noteId)
            if (!note) {
                toast.error("Note", {
                    position: "top-right",
                    description: "Note not exist"
                });
                return
            }
            const {id, ...data} = note
            await updateNoteStoreList(id, { ...data, isArchived: true }).then(() => {
                toast.success("Note", {
                    position: "top-right",
                    description: "Note restored successfully"
                });
            }).catch((error) => {
                toast.error("Note", {
                    position: "top-center",
                    description: error.message ?? "Failed to update note"
                });
            })
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="cursor-pointer w-full text-orange-500 hover:text-orange-500 justify-start">
                    <Archive className="py-0"/><span className='text-left'>Archive</span>
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
                <AlertDialogAction onClick={handleArchiveNote} disabled={isPendingToArchiveNote} className='bg-orange-500  hover:bg-orange-500'>
                    <span className="text-black hover:text-gray-600">Archive</span>
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default NoteArchiveButton