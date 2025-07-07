"use client"
import { useCallback, useEffect, useState } from 'react'
import {
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { toast } from 'sonner';
import { Plus } from "lucide-react";
import { generateNoteId } from '@/lib/utils';
import NoteTagSideBarMenuItemActions from './NoteTagSideBarMenuItemActions';
import { createTagAction, deleteTagAction } from '@/app/actions/tags';
import { TAG_DEFAULT_COLOR, TAG_DEFAULT_NAME } from '@/lib/constants';
import { NoteTagType } from '@/types/tags';

export function NoteTagSibeBarMenuGroup({data}:{data: NoteTagType[]}) {
    
    const [localTagList, setLocalTagList] = useState<NoteTagType[]>(data);

    const handleAddTag = useCallback(async () => {
        const uuid : string = generateNoteId();
        const newTag: NoteTagType = {
            id: uuid.trim(),
            name: TAG_DEFAULT_NAME.trim().toLowerCase(),
            color: TAG_DEFAULT_COLOR.trim()
        }
        const result = await createTagAction(newTag.id, newTag.name, newTag.color);
        if (result.errorMessage) {
            toast.error("Note", {
                position: "top-right",
                description: result?.errorMessage,
                duration: 6000
            });
        } else {
            setLocalTagList(prevList => [...prevList, newTag]);
        }
    }, [setLocalTagList, createTagAction])
    

    const handleRemoveTag = async (tagId: string) => {
        if (tagId.length <= 0) return;
        const updatedTagList = localTagList.filter(tag => tag.id !== tagId);
        setLocalTagList(updatedTagList)

        const result = await deleteTagAction(tagId);
        if (!result.errorMessage) {
            toast.success("Tag", {
                position: "top-right",
                description: `Tag has been removed.`,
            });
        }
    }


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.altKey && event.key === "T") {
                event.preventDefault();
                handleAddTag()
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [handleAddTag]);

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Hashtags</SidebarGroupLabel>
            <SidebarGroupAction title="Add Tag" className="items-center" onClick={handleAddTag}>
                <Plus /> <span className="sr-only">Add Tag</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
                {localTagList && localTagList.map((tag, i) => {
                    return (
                        <NoteTagSideBarMenuItemActions key={`tag_${i}`} 
                            data={{name:tag.name, color: tag.color, id: tag.id}}
                            onRemoveLocally={(value:string) => handleRemoveTag(value)}
                        />)
                })}
            </SidebarGroupContent>
        </SidebarGroup>
    )
}