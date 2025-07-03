"use client"
import { useRef, useState, useTransition } from "react"
import { toast } from "sonner"
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { EllipsisVertical, SquarePen, Trash2, XIcon, Hash } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ColorPicker from "../ui/ColorPicker"
import { UpperCaseFirstLetter } from "@/lib/utils"
import { NoteTagSibeBarMenuGroupPropsType } from "./NoteTagSibeBarMenuGroup"
import { updateTagAction } from "@/app/actions/tags"


const NoteTagSideBarMenuItemActions = ({data, onRemoveLocally}:{data: NoteTagSibeBarMenuGroupPropsType, onRemoveLocally: (value:string) => void}) => {
    const { id, name, color } = data

    const [localTagId, setLocalTagId] = useState<string>(id)
    const [localTagName, setLocalTagName] = useState<string>(name)
    const [localTagColor, setTagColor] = useState<string>(color);

    const [isPendingToUpdateTagName, startTransitionToUpdateTagName] = useTransition()
    const [isLoading, setIsLoading] = useState(false)
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)

    
    const handleRenameTag = () => {
        startTransitionToUpdateTagName(async () => {
            setLocalTagName(localTagName.trim())
            const result = await updateTagAction(localTagId, localTagName.trim().toLowerCase(), localTagColor.trim())
            if (result.errorMessage) {
                toast.error("Note", {
                    position: "top-right",
                    description: result.errorMessage
                });
            } else {
                toast.success("Note", {
                    position: "top-right",
                    description:"Note renamed successfully"
                });
            }
        })
        if (!isPendingToUpdateTagName) {
            setIsLoading(false)
        }
        setIsOpenDropdown(false)
    }

    const handleChangeTagColor = async (color: string) => {
        setTagColor(color)
        const result = await updateTagAction(localTagId, localTagName.trim().toLowerCase(), color.trim())
        if (result.errorMessage) {
            toast.error("Tag", {
                position: "top-right",
                description: result.errorMessage
            });
        } else {
            toast.success("Tag", {
                position: "top-right",
                description:"Tag color changed successfully"
            });
        }
    }
    
    const handleDeleteTag = () => {
        onRemoveLocally(localTagId)
        setLocalTagId("")
        setLocalTagName("")
        setTagColor("")
        setIsOpenDropdown(false)
    }

    if (isLoading) {
        return (
            <div className="relative w-full max-w-sm mb-2">
                <Input type="text"
                    value={localTagName}
                    onChange={(e) => setLocalTagName(e.target.value)}
                    placeholder="Rename note"
                    className="w-full bg-transparent text-sm text-muted-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-brand-500"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleRenameTag()
                        }
                    }}
                    autoFocus={isLoading && localTagId === id}
                />
                <Button type="button" variant="ghost" size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    onClick={() => {
                        setLocalTagName(name)
                        setTagColor(color)
                        setIsLoading(false)
                        setLocalTagId(id)
                    }}
                >
                    <XIcon className="h-4 w-4"/><span className="sr-only">Clear</span>
                </Button>
            </div>
        )
    }

    return (
        <SidebarMenuItem key={id} className="flex items-center justify-between gap-2">
            <SidebarMenuButton asChild className={`cursor-pointer mb-1`} >
                <div><span style={{ color: localTagColor, fontSize:"18" }}>#</span> <span className="text-sm px-2">{UpperCaseFirstLetter(localTagName)}</span></div>
            </SidebarMenuButton>
            <DropdownMenu open={isOpenDropdown} onOpenChange={setIsOpenDropdown}>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction>
                        <EllipsisVertical className="text-black" />
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="start">
                    <DropdownMenuItem className="cursor-pointer" 
                        onClick={() => {setIsLoading(true); setLocalTagId(id);}}
                    >
                        <SquarePen /><span>Rename</span>
                    </DropdownMenuItem>
                    <DropdownMenuGroup className="cursor-pointer justify-center">
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='cursor-pointer text-center"'>Tag Color</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem asChild >
                                        <ColorPicker value={localTagColor} onChange={handleChangeTagColor} />
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal> 
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Button variant="ghost" className="cursor-pointer w-full justify-start text-red-500 hover:text-red-500" 
                            onClick={() => {
                                setLocalTagId(id)
                                handleDeleteTag()
                            }}
                        >
                            <Trash2 className="text-red-500"/><span>Delete</span>
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    )
}
export default NoteTagSideBarMenuItemActions