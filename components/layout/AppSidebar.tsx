import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Archive,  ChevronDown, MoreHorizontal, SquarePen, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
// import { useState } from "react"

type NoteMenuGroupSibeBarProps = {
    title: string
    children: React.ReactNode
    defaultOpen?: boolean
}

const NoteMenuGroupSibeBar = (props : Readonly<NoteMenuGroupSibeBarProps>) => {
    const { title, children, defaultOpen } = props
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
                            {children}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    )
}


interface INoteSideBar {
    id: string
    title: string
    isActive?: boolean
    frename?  : () => void
    farchive? : () => void
    fremove?  : () => void
}
const SideBarMenuAction = (props: INoteSideBar) => {
    const { id, title, isActive, frename, farchive, fremove } = props

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive}>
                <a href="#"><span>{title}</span></a>
            </SidebarMenuButton>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction>
                        <MoreHorizontal />
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem onClick={frename}>
                        <SquarePen />
                        <span>Rename</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={farchive}>
                        <Archive />
                        <span>Archive</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={fremove}>
                        <Trash2 />
                        <span className="text-red-500">Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    )
}

export function AppSidebar() {
    // const [isActiveNote, setIsActiveNote] = useState<string>("note-1")
    const items = [
        {
            title: "Notes",
        },
        {
            title: "Archives",
        },
    ]
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center justify-between px-4 py-2">
                    <h1 className="text-lg font-bold">Keep note</h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarGroupContent>
                            <NoteMenuGroupSibeBar defaultOpen title="Notes">
                                <SideBarMenuAction id="note-1" title="Note 1" isActive/>
                                <SideBarMenuAction id="note-2" title="Note 2"/>
                                <SideBarMenuAction id="note-3" title="Note 3"/>
                            </NoteMenuGroupSibeBar>
                            <NoteMenuGroupSibeBar title="Archives">
                                <SideBarMenuAction id="archive-1" title="Archive 1"/>
                                <SideBarMenuAction id="archive-2" title="Archive 2"/>
                            </NoteMenuGroupSibeBar>
                        </SidebarGroupContent>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}