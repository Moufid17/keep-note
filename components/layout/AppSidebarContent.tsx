"use client"
import {
    SidebarContent,
} from "@/components/ui/sidebar"
import NoteSideBarMenuGroup from "@/components/common/NoteSideBarMenuGroup"
import { useEffect, useMemo } from "react";
import { NoteTagSibeBarMenuGroup } from "../common/NoteTagSibeBarMenuGroup";
import { useNoteStore } from "@/store/noteListStore";
import { useTagStore } from "@/store/tagListStore";
import Fuse from "fuse.js";
import { NoteType } from "@/types/notes";
import { QUERY_DEFAULT_TAG_VALUE } from "@/lib/constants";


export function AppSidebarContent({query, filter}: {query: string, filter: string}) {
    const {items: noteStoreList, getItems: getNoteStoreList } = useNoteStore((state) => state) 
    const {items: tagStoreList, getItems: getTagStoreList } = useTagStore((state) => state)

    useEffect(() => {
        let ignore = false
        const fetchNotes = async () => await getNoteStoreList()
        const fetchTags = async () => await getTagStoreList()
        if (!ignore) {
            fetchNotes()
            fetchTags()
        }
        return () => { ignore = true; };
    }, [getNoteStoreList, getTagStoreList])

    const fuseOptions = {
        keys: ["title", "tagId"],
        threshold: 0.2,
    }
    const fuse = new Fuse(noteStoreList, fuseOptions);

    const filteredItems : NoteType[] = useMemo(() => {
        let data : NoteType[] = noteStoreList
        const queryData = query.trim().toLowerCase();
        const filterData = filter.trim().toLowerCase();

        if (query.length > 0) {
            const queryResults = fuse.search(queryData)
            data = queryResults.map(result => result.item)
        }

        if (filterData.length > 0 && filterData !== QUERY_DEFAULT_TAG_VALUE) {
            let filterResults = [];
            if (queryData.length === 0) {
                filterResults = fuse.search(filterData)
            } else {
                filterResults = fuse.search({
                    $and: [
                        { title: queryData },
                        { tagId: filterData }
                    ]
                })
            }
            data = filterResults.map(result => result.item)
            // or // data = data.filter(item => item.tagId === filter)
        }
        return data
    }, [query, filter, noteStoreList]);

    const archivedItems = useMemo(() => filteredItems.filter(item => item.isArchived), [filteredItems]);
    const unarchivedItems = useMemo(() => filteredItems.filter(item => !item.isArchived), [filteredItems]);

    return (
        <SidebarContent>
            <NoteSideBarMenuGroup key={"notes_"+unarchivedItems.length} defaultOpen title={`Notes (${unarchivedItems.length})`} notes={unarchivedItems}/> 
            <NoteSideBarMenuGroup key={"archived_"+archivedItems.length} title={`Notes Archived (${archivedItems.length})`} notes={archivedItems}/> 
            <NoteTagSibeBarMenuGroup key={"tag_"+tagStoreList.length} data={tagStoreList}/>
        </SidebarContent>
    )
}