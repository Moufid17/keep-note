"use client"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar"
import NoteSideBarMenuItemActions from "@/components/common/NoteSideBarMenuItemActions"
import { ChevronDown } from "lucide-react"
import { NoteListSibeBarProps } from "@/components/layout/AppSidebar"
import { useState } from "react"
import { useRouter } from "next/navigation"

type NoteSideBarMenuGroupProps = {
    title: string
    defaultOpen?: boolean
    notes: NoteListSibeBarProps[]
}


const NoteSideBarMenuGroup = (props : Readonly<NoteSideBarMenuGroupProps>) => {
    const router = useRouter();
    const { title, notes, defaultOpen } = props
    const [localNotes, setLocalNotes] = useState<NoteListSibeBarProps[]>(notes);
    const [editingNoteId, setEditingNoteId] = useState<string|null>(null);

    if (notes !== localNotes) {
        setLocalNotes(notes);       
    }

    const handleRemoveNoteFromCurrentLocalList = (noteId: string) => {
        const updatedNotes = localNotes.filter((note) => note.id !== noteId);
        setLocalNotes(updatedNotes);
        
        if (updatedNotes.length >= 1 && !updatedNotes[0].isArchived === false) {
            // Redirect to the first note in the list if it exists and is not archived
            router.replace(`/notes/?noteId=${updatedNotes[0]?.id}`)
        } else {
            router.replace(`/notes`)
        }
    };

    return (
        <Collapsible className="group/collapsible" defaultOpen={defaultOpen}>
            <SidebarGroup className="py-0">
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="pr-0">
                        {title}
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarGroupContent className="lg:pl-2 h-40 lg:min-h-50 overflow-y-auto overflow-x-hidden">
                        <SidebarMenu>
                            {localNotes.map((note: NoteListSibeBarProps) => 
                                    <NoteSideBarMenuItemActions key={`${note.id}`} note={note}
                                        onRemoveLocally={() => handleRemoveNoteFromCurrentLocalList(note.id)}
                                        editingNoteId={editingNoteId}
                                        setEditingNoteId={(id: string|null) => setEditingNoteId(id)}
                                    />
                                )
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    )
}

export default NoteSideBarMenuGroup