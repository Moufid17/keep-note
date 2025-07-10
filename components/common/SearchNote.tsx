import { ChangeEvent } from 'react'
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { Input } from '../ui/input'

function SearchNote() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace: routerReplace} = useRouter()

    const handleFilterNotes = (event: ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams)
        const query = event.target.value.trim().toLowerCase()
        if (query.length > 0) {
            params.set('query', query)
        } else {
            params.delete('query')
        }
        routerReplace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex items-center justify-between px-1">
            <Input autoFocus type="text" placeholder="Search note(s)" className='placeholder:italic' 
                defaultValue={searchParams.get("query")?.toString()} onChange={handleFilterNotes}
            />
        </div>
    )
}

export default SearchNote