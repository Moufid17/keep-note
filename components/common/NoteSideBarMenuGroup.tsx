"use client"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar"
import NoteSideBarMenuItemActions from "@/components/common/NoteSideBarMenuItemActions"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { NoteType } from "@/types/notes"

type NoteSideBarMenuGroupProps = {
    title: string
    defaultOpen?: boolean
    notes: NoteType[]
}


const NoteSideBarMenuGroup = (props : Readonly<NoteSideBarMenuGroupProps>) => {
    const { title, notes, defaultOpen } = props
    const [localNotes, setLocalNotes] = useState<NoteType[]>(notes);

    if (notes !== localNotes) {
        setLocalNotes(notes);       
    }

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
                    <SidebarGroupContent className="lg:pl-2 h-60 lg:min-h-auto overflow-y-auto overflow-x-hidden">
                        <SidebarMenu>
                            {localNotes.map((note: NoteType) => 
                                    <NoteSideBarMenuItemActions key={`${note.id}`} note={note} />
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