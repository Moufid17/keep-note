"use client"
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { generateNoteId } from '@/lib/utils';
import { useNoteStore } from '@/store/noteListStore';
import { QUERY_NOTE_PARAM, QUERY_TAG_PARAM } from '@/lib/constants';


function NewNoteButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {addItem: addNoteStore} = useNoteStore((state) => state)
    
    const handleClickNewNoteButton = useCallback(async () => {
        setIsLoading(true);
        const uuid : string = generateNoteId();

        await addNoteStore(uuid).then(() => {
            toast.success("Note", {
                position: "top-right",
                description:"Note created successfully"
            });
            router.push(`/notes/?${QUERY_NOTE_PARAM}=${uuid}&${QUERY_TAG_PARAM}=null`);
        }).catch((error) => {
            toast.error("Note", {
                position: "top-center",
                description: error.message ?? "Failed to add note",
            });
        })
        
        setIsLoading(false);
    }, [addNoteStore, router]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.altKey && event.key === "K") {
                event.preventDefault();
                handleClickNewNoteButton()
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [handleClickNewNoteButton]);

    return (
        <Button
            onClick={handleClickNewNoteButton}
            disabled={isLoading}
        >
            { isLoading ? "creating..." : (
                <>
                    <span>New Note</span>
                    <span className="text-gray-600 dark:bg-black border rounded-sm px-1">Alt + K</span>
                </>
            ) }
        </Button>
    )
}

export default NewNoteButton