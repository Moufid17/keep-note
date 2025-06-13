"use client"
import {useState} from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loader2, LogOut } from 'lucide-react'
import { logout } from '@/app/actions/users'

function LogoutButton({onClick}: { onClick?: () => void }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogout = async () => {
        setLoading(true)
        if (onClick) onClick()
        const error = await logout()
        if (error?.errorMessage) {
            toast.error("Logout", {
                position: "top-right",
                description: error.errorMessage,
                duration: 6000,
            });
        }
        toast.success("Logout", {
            position: "top-right",
            description:"User logged out successfully",
        });
        router.push("/")

        setLoading(false)
    }
    return (
        <Button 
            onClick={handleLogout}
            disabled={loading}
            asChild
            size={"icon"}
            aria-label='Logout'
        >
            <div>
                {loading ? (<Loader2 className="animate-spin" />) : (<LogOut />)}
            </div>
        </Button>
    )
}

export default LogoutButton