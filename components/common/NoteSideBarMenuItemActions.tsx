"use client"
import Link from "next/link"
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Archive, MoreHorizontal, SquarePen, Trash2 } from "lucide-react"
import { useSearchParams } from "next/navigation"

interface INoteSideBar {
    id: string
    title: string
}

const NoteSideBarMenuItemActions = (props: INoteSideBar) => {
    const noteId = useSearchParams().get("noteId") ?? ""
    const { id, title } = props

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild {...(noteId === id ? { className: "bg-brand-100 text-black" } : {})}>
                <Link href={`/?noteId=${id}`}><span>{title}</span></Link>
            </SidebarMenuButton>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction>
                        <MoreHorizontal />
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem>
                        <SquarePen /><span>Rename</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Archive /><span>Archive</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Trash2 className="text-red-500"/><span className="text-red-500">Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    )
}
export default NoteSideBarMenuItemActions