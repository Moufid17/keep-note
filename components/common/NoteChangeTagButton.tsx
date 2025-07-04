"use client"
import React from 'react'
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '../ui/dropdown-menu'
import { useTagStore } from '@/store/tagListStore'
import { useNoteStore } from '@/store/noteListStore'
import { NoteType } from '@/types/notes'
import { toast } from 'sonner'
import TagIcon from '../ui/TagIcon'
import { UpperCaseFirstLetter } from '@/lib/utils'
import { useRouter } from 'next/navigation'

function NoteChangeTagButton({noteId, tagId}: {noteId: string, tagId?:string}) {

    const router = useRouter()

    const {items: storeTagList} = useTagStore((state) => state)
    const {items: noteStoreList, updateItem: updateNoteStore} = useNoteStore((state) => state)

    const handleSelectTag = async (tagItemId: string) => {
        const note : NoteType | undefined = noteStoreList.find(note => note.id === noteId)

        if (note) {
             if (tagItemId === tagId) {
                // If the selected tag is the same as the current tag, remove the tag
                await updateNoteStore(noteId, { ...note, tagId: null }).then(() => {
                    toast.success("Tag", {
                        position: "top-right",
                        description: "Tag removed successfully"
                    })
                    router.replace(`/notes?noteid=${noteId}`)
                })
            } else {
                await updateNoteStore(noteId, { ...note, tagId: tagItemId }).then(() => {
                    toast.success("Tag", {
                        position: "top-right",
                        description: "Tag changed successfully"
                    })
                })
                router.replace(`/notes?noteid=${noteId}&tagid=${tagItemId}`)
            }

        } else {
            toast.error("Error", {
                position: "top-right",
                description: "Note not found"
            })
        }
    }

    return (
        <DropdownMenuGroup className="cursor-pointer justify-center">
            <DropdownMenuSub>
                <DropdownMenuSubTrigger className='cursor-pointer text-start'>Tags</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        {storeTagList.length > 0 && storeTagList.map((storeTagItem, index) => (
                            <DropdownMenuItem key={index} asChild onClick={() => handleSelectTag(storeTagItem.id)}>
                                <div>
                                    <p>
                                        <TagIcon color={storeTagItem.color}/><span>{UpperCaseFirstLetter(storeTagItem.name)}</span>
                                        {storeTagItem !== null && storeTagItem.id === tagId && (
                                            <span className="text-xs text-gray-500 ml-2">Remove</span>
                                        )}
                                    </p>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuSubContent>
                </DropdownMenuPortal> 
            </DropdownMenuSub>
        </DropdownMenuGroup>
    )
}

export default NoteChangeTagButton