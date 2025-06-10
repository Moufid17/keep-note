import { Link2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="relative w-24 h-24 flex flex-col items-center">
            <Image src="/app.svg" alt="logo" priority fill/>
        </div>
        <div className='flex gap-4'>
            <div className='flex flex-col justify-center pr-2 border-r-2 border-r-black dark:border-r-white'><h1>404</h1></div>
            <div>
                <h3 className="font-[1rem]">Not Found</h3>
                <h3 className="font-[1.5rem]">Oops! The page does not exist.</h3>
                <Link href="/" className="text-brand-400 hover:underline flex items-center gap-2">
                    Go to Home
                    <Link2 className="w-4 h-4" />
                </Link>
            </div>
        </div>
    </div>
  )
}