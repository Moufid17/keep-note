
"use client"
import Fuse from "fuse.js"
import {
    Sidebar,
    SidebarHeader,
} from "@/components/ui/sidebar"

import { Input } from "../ui/input"
import { User } from "@supabase/supabase-js"
import { ChangeEvent, useEffect, useState } from "react"
import { AppSidebarContent } from "./AppSidebarContent"
import { useTagStore } from "@/store/tagListStore"
import { useNoteStore } from "@/store/noteListStore"
import { NoteType } from "@/types/notes"
import { Button } from "../ui/button"
import { UpperCaseFirstLetter } from "@/lib/utils"
import SearchNote from "../common/SearchNote"
import FilterNote from "../common/FilterNote"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="flex flex-col items-start justify-between">
                <SearchNote key="search_note" />
                <FilterNote key="filter_note" />
            </SidebarHeader>
            <AppSidebarContent key="app_sidebar"/>
        </Sidebar>
    )
}