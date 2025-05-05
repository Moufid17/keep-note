import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
  } from "@/components/ui/sidebar"

import { prismaClient } from "@/db/prisma"
import { getUser } from "@/auth/server"
import Link from "next/link"
import NoteSideBarMenuGroup from "@/components/common/NoteSideBarMenuGroup"
import NoteSideBarMenuItemActions from "@/components/common/NoteSideBarMenuItemActions"


type NoteListSibeBarProps = {
    id: string
    text: string
}

export async function AppSidebar() {
    const user = await getUser();
    let notes: NoteListSibeBarProps[] = []
    if (user) {
        notes = await prismaClient.note.findMany({
            where: {
                author: {email: user.email},
            },
            select: {
                id: true,
                text: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        })
    }
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center justify-between px-4 py-2">
                    {user ? <h1 className="text-lg font-bold">Keep note</h1>
                    :
                        <p> <Link href="/login" className="underline">Login</Link>{" "} to see your notes </p>
                    }
                </div>
            </SidebarHeader>
            {user && (
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarGroupContent>
                                <NoteSideBarMenuGroup defaultOpen title="Notes">
                                    {notes.map((note: NoteListSibeBarProps) => 
                                            <NoteSideBarMenuItemActions key={`${note.id}`} id={`${note.id}`}  title={`${note.text.slice(0, 28)}`}/>
                                        )
                                    }
                                </NoteSideBarMenuGroup>
                            </SidebarGroupContent>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            )}
            <SidebarFooter />
        </Sidebar>
    )
}