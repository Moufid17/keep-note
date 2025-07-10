"use client"
import { useMemo, useState } from 'react'
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { Button } from '../ui/button'
import { useTagStore } from '@/store/tagListStore'
import { UpperCaseFirstLetter } from '@/lib/utils'
import { QUERY_DEFAULT_TAG_VALUE, QUERY_FILTER_PARAM } from '@/lib/constants'

function FilterNote() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace: routerReplace} = useRouter()

    const initialTag = useMemo(() => searchParams.get(QUERY_FILTER_PARAM) || QUERY_DEFAULT_TAG_VALUE, [searchParams])

    const [searchCurrentTag, setSearchCurrentTag] = useState<string>(initialTag)

    const {items: tagStoreList} = useTagStore((state) => state)

    const handleFilterByTag = (tagId: string) => {
        const params = new URLSearchParams(searchParams)
        if (!tagId || tagId === QUERY_DEFAULT_TAG_VALUE) {
            params.set(QUERY_FILTER_PARAM , QUERY_DEFAULT_TAG_VALUE)
            setSearchCurrentTag(QUERY_DEFAULT_TAG_VALUE)
        } else {
            params.set(QUERY_FILTER_PARAM, tagId)
            setSearchCurrentTag(tagId)
        }
        routerReplace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="px-1 flex flex-wrap items-center justify-start ">
            <Button key="tag_all" className="text-xs mr-1" size={"sm"} variant={searchCurrentTag === QUERY_DEFAULT_TAG_VALUE ? "default" : "secondary"}
                onClick={handleFilterByTag.bind(null, QUERY_DEFAULT_TAG_VALUE)}
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