"use client"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar"
import NoteSideBarMenuItemActions from "@/components/common/NoteSideBarMenuItemActions"
import { ChevronDown } from "lucide-react"
import { NoteListSibeBarProps } from "@/components/layout/AppSidebar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type NoteSideBarMenuGroupProps = {
    title: string
    defaultOpen?: boolean
    notes: NoteListSibeBarProps[]
}


const NoteSideBarMenuGroup = (props : Readonly<NoteSideBarMenuGroupProps>) => {
    const router = useRouter();
    const { title, notes, defaultOpen } = props
    const [localNotes, setLocalNotes] = useState(notes);

    useEffect(() => {
      setLocalNotes(notes);
    }, [notes]);

    const deleteNoteLocally = (noteId: string) => {
        const updatedNotes = localNotes.filter((note) => note.id !== noteId);
        setLocalNotes((prevNotes) => updatedNotes);
        
        if (updatedNotes.length >= 1) {
            router.replace(`/?noteId=${updatedNotes[0]?.id}`)
        } else {
            router.replace(`/`)
        }
    };

    return (
        <Collapsible className="group/collapsible" defaultOpen={defaultOpen}>
            <SidebarGroup>
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="pr-0">
                        {title}
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarGroupContent className="pl-2">
                        <SidebarMenu>
                            {localNotes.map((note: NoteListSibeBarProps) => 
                                    <NoteSideBarMenuItemActions key={`${note.id}`} note={note}
                                        onDeleteLocally={() => deleteNoteLocally(note.id)}
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