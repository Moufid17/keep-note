"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { User } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';
import { createNoteAction } from '@/app/actions/notes';
import { toast } from 'sonner';

type NewNoteButtonProps = {
    user: User | null
}

function NewNoteButton({ user }: NewNoteButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleClickNewNoteButton = async () => {
        if (!user) router.push("/login");

        setIsLoading(true);

        const uuid : string = crypto.randomUUID()
        const error = await createNoteAction(uuid);
        if (error) {
            if (error.errorMessage) {
                toast.error(error?.errorMessage);
            } else {
                router.push(`/?noteId=${uuid}`);
                toast.success("Note created successfully");
            }
        }
        
        setIsLoading(false);
    }

    return (
        <Button
            onClick={handleClickNewNoteButton}
            disabled={isLoading}
        >
            {isLoading ? "Creating..." : "New Note"}
        </Button>
    )
}

export default NewNoteButton