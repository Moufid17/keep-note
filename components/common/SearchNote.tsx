import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { Input } from '../ui/input'
import { QUERY_SEARCH_PARAM } from '@/lib/constants'
import { useDebounceCallback } from '@/hooks/useDebounce'

function SearchNote() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace: routerReplace} = useRouter()

    const handleSearchNotes = useDebounceCallback((term:string) => {
        const params = new URLSearchParams(searchParams)
        const query = term.trim().toLowerCase()
        if (query.length > 0) {
            params.set(QUERY_SEARCH_PARAM, query)
        } else {
            params.delete(QUERY_SEARCH_PARAM)
        }
        
        routerReplace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <div className="flex items-center justify-between px-1">
            <Input autoFocus type="text" placeholder="Search note(s)..." className='placeholder:italic' 
                defaultValue={searchParams.get(QUERY_SEARCH_PARAM)?.toString()} onChange={(event) => handleSearchNotes(event.target.value)}
            />
        </div>
    )
}

export default SearchNote