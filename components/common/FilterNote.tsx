"use client"
import { useEffect, useState } from 'react'
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { Button } from '../ui/button'
import { useTagStore } from '@/store/tagListStore'
import { UpperCaseFirstLetter } from '@/lib/utils'

function FilterNote() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace: routerReplace} = useRouter()
    const [searchCurrentTag, setSearchCurrentTag] = useState<string>("all")

    const {items: tagStoreList} = useTagStore((state) => state)

    const handleFilterByTag = (tagId: string) => {
        const params = new URLSearchParams(searchParams)
        if (!tagId || tagId === "all") {
            params.set('tagid', "all")
            setSearchCurrentTag("all")
        } else {
            params.set('tagid', tagId)
            setSearchCurrentTag(tagId)
        }
        routerReplace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="px-1 flex flex-wrap items-center justify-start ">
            <Button key="tag_all" className="text-xs mr-1" size={"sm"} variant={searchCurrentTag === "all" ? "default" : "secondary"}
                onClick={handleFilterByTag.bind(null, "all")}
            >All</Button>
            {tagStoreList.length > 0 && tagStoreList.map((tag) => (
                <Button key={tag.id} className="text-xs mr-1 my-1" size={"sm"} variant={searchCurrentTag === tag.id ? "default" : "secondary"}
                    onClick={handleFilterByTag.bind(null, tag.id)}
                >
                    {UpperCaseFirstLetter(tag.name)}
                </Button>
            ))}                
        </div>
    )
}

export default FilterNote