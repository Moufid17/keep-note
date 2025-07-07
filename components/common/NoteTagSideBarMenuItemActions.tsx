"use client"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { EllipsisVertical, SquarePen, Trash2, XIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ColorPicker from "../ui/ColorPicker"
import { UpperCaseFirstLetter } from "@/lib/utils"
import TagIcon from "../ui/TagIcon"
import { NoteTagType } from "@/types/tags"
import { useTagStore } from "@/store/tagListStore"
import { useRouter, useSearchParams } from "next/navigation"
import { useNoteStore } from "@/store/noteListStore"
import { NoteType } from "@/types/notes"


const NoteTagSideBarMenuItemActions = ({data, onRemoveLocally}:{data: NoteTagType, onRemoveLocally: (value:string) => void}) => {
    const router = useRouter()
    const { id, name, color: initialColor } = data
    
    const noteId = useSearchParams().get("noteid") ?? ""
    const tagIdParam = useSearchParams().get("tagId") ?? ""
    const {items: noteStoreList, updateItem: updateNoteStore} = useNoteStore((state) => state) 

    const [localTagId, setLocalTagId] = useState<string>(id)
    const [localTagName, setLocalTagName] = useState<string>(name)
    const [localTagColor, setTagColor] = useState<string>(initialColor)

    const [isPendingToUpdateTagName, startTransitionToUpdateTagName] = useTransition()
    const [isLoading, setIsLoading] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const {updateItem: updateTag } = useTagStore((state) => state)

    const handleRenameTag = () => {
        startTransitionToUpdateTagName(async () => {
            const newTagName = localTagName.trim().toLowerCase()
            setLocalTagName(newTagName)
            await updateTag(localTagId, { name: newTagName, color: localTagColor.trim() })
            toast.success("Note", {
                position: "top-right",
                description:"Note renamed successfully"
            });
        })
        if (!isPendingToUpdateTagName) {
            setIsLoading(false)
        }
    }

    const handleChangeTagColor = async (color: string) => {
        setTagColor(color)
    }

    const handleChangeTag = async () => {
        const note : NoteType | undefined = noteStoreList.find(note => note.id === noteId)
        if (note) {
            if (tagIdParam && tagIdParam.length> 0 && localTagId === tagIdParam) return

            await updateNoteStore(noteId, { ...note, tagId: localTagId }).then(() => {
                toast.success("Tag", {
                    position: "top-right",
                    description: "Tag changed successfully"
                })
                router.replace(`/notes?noteid=${noteId}&tagid=${localTagId}`)
            })
        } else {
            toast.error("Error", {
                position: "top-right",
                description: "Note not found"
            })
        }
    }
    
    const handleDeleteTag = () => {
        onRemoveLocally(localTagId)
        setLocalTagId("")
        setLocalTagName("")
        setTagColor("")
    }
    const handleChangeTagColorWhenDropDownMenuIsClosedAndInitialColorChanged = async () => {
        if (!isDropdownOpen && localTagColor !== initialColor) {
            // l'utilisateur a fermé le menu, on applique les changements
            
            await updateTag(localTagId, { name: localTagName.trim().toLowerCase(), color: localTagColor.trim()})
            toast.success("Tag", {
                position: "top-right",
                description: "Tag color changed successfully"
            })
        }
    }
    useEffect(() => {
        handleChangeTagColorWhenDropDownMenuIsClosedAndInitialColorChanged()
    }, [isDropdownOpen, handleChangeTagColorWhenDropDownMenuIsClosedAndInitialColorChanged])

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
                        setTagColor(initialColor)
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
            <SidebarMenuButton asChild className={`cursor-pointer mb-1`} onClick={handleChangeTag}>
                <div><TagIcon color={localTagColor}/><span className="text-sm px-2">{UpperCaseFirstLetter(localTagName)}</span></div>
            </SidebarMenuButton>
            <DropdownMenu onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction>
                        <EllipsisVertical className="text-black" />
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="start">
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
                    <DropdownMenuItem className="cursor-pointer" 
                        onClick={() => {setIsLoading(true); setLocalTagId(id);}}
                    >
                        <SquarePen /><span>Rename</span>
                    </DropdownMenuItem>
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