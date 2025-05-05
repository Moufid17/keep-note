import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar"
import { ChevronDown } from "lucide-react"

type NoteSideBarMenuGroupProps = {
    title: string
    children: React.ReactNode
    defaultOpen?: boolean
}

const NoteSideBarMenuGroup = (props : Readonly<NoteSideBarMenuGroupProps>) => {
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

export default NoteSideBarMenuGroup