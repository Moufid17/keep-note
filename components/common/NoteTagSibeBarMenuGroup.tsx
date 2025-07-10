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
import { QUERY_FILTER_PARAM, TAG_DEFAULT_COLOR, TAG_DEFAULT_NAME } from '@/lib/constants';
import { NoteTagType } from '@/types/tags';
import { useTagStore } from '@/store/tagListStore';
import { useSearchParams, usePathname, useRouter } from "next/navigation"

export function NoteTagSibeBarMenuGroup({data}:{data: NoteTagType[]}) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace: routerReplace} = useRouter()

    const {items: tagStoreList, addItem: addTagToStore, removeItem: removeTagFromStore} = useTagStore((state) => state)
    const [localTagList, setLocalTagList] = useState<NoteTagType[]>(data);

    const handleAddTag = useCallback(async () => {
        const uuid : string = generateNoteId();
        const newTag: NoteTagType = {
            id: uuid.trim(),
            name: TAG_DEFAULT_NAME.trim().toLowerCase(),
            color: TAG_DEFAULT_COLOR.trim()
        }
        await addTagToStore({...newTag}).then(() => {
            setLocalTagList(prevList => [...prevList, newTag]);
            toast.success("Note", {
                position: "top-right",
                description: "Note restored successfully"
            });
        }).catch((error) => {
            console.error("Error updating note in store:", error);
            toast.error("Note", {
                position: "top-right",
                description: "Failed to add tag",
                duration: 6000
            });
        })
    }, [setLocalTagList])
    

    const handleRemoveTag = async (tagId: string) => {
        if (tagId.length <= 0) return;
        await removeTagFromStore(tagId).then(() => {
            const updatedTagList = localTagList.filter(tag => tag.id !== tagId);
            setLocalTagList(updatedTagList)
            toast.success("Tag", {
                position: "top-right",
                description: `Tag has been removed.`,
            });
            // Remove tag from search params if it exists
            const params = new URLSearchParams(searchParams);
            if (params.has(QUERY_FILTER_PARAM) && params.get(QUERY_FILTER_PARAM) === tagId) {
                params.delete(QUERY_FILTER_PARAM);
                routerReplace(`${pathname}?${params.toString()}`);
            }
        }).catch((error) => {
            console.error("Error removing tag in store:", error);
            toast.error("Note", {
                position: "top-right",
                description: error?.errorMessage ?? "Failed to remove tag",
            });
        })
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