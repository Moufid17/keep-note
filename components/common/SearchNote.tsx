import { ChangeEvent } from 'react'
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { Input } from '../ui/input'
import { QUERY_SEARCH_PARAM } from '@/lib/constants'

function SearchNote() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace: routerReplace} = useRouter()

    const handleSearchNotes = (event: ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams)
        const query = event.target.value.trim().toLowerCase()
        if (query.length > 0) {
            params.set(QUERY_SEARCH_PARAM, query)
        } else {
            params.delete(QUERY_SEARCH_PARAM)
        }
        routerReplace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex items-center justify-between px-1">
            <Input autoFocus type="text" placeholder="Search note(s)..." className='placeholder:italic' 
                defaultValue={searchParams.get(QUERY_SEARCH_PARAM)?.toString()} onChange={handleSearchNotes}
            />
        </div>
    )
}

export default SearchNote