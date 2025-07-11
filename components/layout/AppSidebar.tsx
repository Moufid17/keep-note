
"use client"
import {
    Sidebar,
    SidebarHeader,
} from "@/components/ui/sidebar"

import { AppSidebarContent } from "./AppSidebarContent"
import SearchNote from "../common/SearchNote"
import FilterNote from "../common/FilterNote"
import { useSearchParams } from "next/navigation"
import { QUERY_FILTER_PARAM, QUERY_SEARCH_PARAM } from "@/lib/constants"

export function AppSidebar() {
    const searchParams = useSearchParams()

    const initialSearch = searchParams.get(QUERY_SEARCH_PARAM) ?? ""
    const initialFilter = searchParams.get(QUERY_FILTER_PARAM) ?? ""

    return (
        <Sidebar>
            <SidebarHeader className="flex flex-col items-start justify-between">
                <SearchNote key="search_note" />
                <FilterNote key="filter_note" />
            </SidebarHeader>
            <AppSidebarContent key="app_sidebar" query={initialSearch} filter={initialFilter}/>
        </Sidebar>
    )
}