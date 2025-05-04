"use client"
import React from 'react'
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
    const [isLoading, setIsLoading] = React.useState(false);
    
    const handleClickNewNoteButton = async () => {
        if (!user) router.push("/login");

        setIsLoading(true);

        const uuid : string = crypto.randomUUID()
        const error = await createNoteAction(uuid);
        if (error) {
            if (error.errorMessage) {
                toast.error(error?.errorMessage);
            } else {
                toast.success("Note created successfully");
                router.push(`/?noteId=${uuid}`);
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