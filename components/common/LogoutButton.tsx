"use client"
import {useState} from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { logout } from '@/app/actions/users'

function LogoutButton() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogout = async () => {
        setLoading(true)
        
        const error = await logout()
        if (!error?.errorMessage) {
            toast.success("User logged out successfully")
            router.push("/")
        } else {
            toast.error(error.errorMessage)
        }
        setLoading(false)
    }
    return (
        <Button 
            onClick={handleLogout}
            disabled={loading}
            asChild
            variant={"outline"}
            size={"sm"}
        >
            <Link href={"/"}>
                {loading ? (<Loader2 className="animate-spin" />) : "Logout"}
            </Link>
        </Button>
    )
}

export default LogoutButton