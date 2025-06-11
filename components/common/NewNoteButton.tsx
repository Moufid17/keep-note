"use client"
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import { createNoteAction } from '@/app/actions/notes';
import { toast } from 'sonner';
import { generateNoteId } from '@/lib/utils';


function NewNoteButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleClickNewNoteButton = useCallback(async () => {
        setIsLoading(true);

        const uuid : string = generateNoteId();
        const error = await createNoteAction(uuid);
        if (error) {
            if (error.errorMessage) {
                toast.error(error?.errorMessage);
            } else {
                router.push(`/notes/?noteId=${uuid}`);
                toast.success("Note created successfully");
            }
        }
        
        setIsLoading(false);
    }, [router]);

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