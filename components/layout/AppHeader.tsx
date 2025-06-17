"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from "../common/DarkModeToggle";
import LogoutButton from "../common/LogoutButton";
import { getClientUser } from '@/auth/client';
import { User } from '@supabase/supabase-js';
import { SidebarTrigger } from '../ui/sidebar';

const AppHeader = () => {
    const [user, setUser] = useState<User | null>(null);
    
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const menuButtonRef = useRef<HTMLButtonElement>(null)

    const handleClickInsideMenuDiv = () => {
        mobileMenuRef.current?.classList.toggle("hidden");
    }

    const handleClickOutsideMenuDiv = (event: MouseEvent) => {
        const mobileMenuElement = mobileMenuRef.current
        const menuButtonElement = menuButtonRef.current
        const mouseClickTarget = event.target as Node

        if (mobileMenuElement && menuButtonElement
            && !mobileMenuElement.contains(mouseClickTarget)
            && mouseClickTarget != menuButtonElement
            && !mobileMenuElement.classList.contains('hidden')
        ) {
            mobileMenuElement.classList.add('hidden')
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getClientUser();
            if (fetchedUser) setUser(fetchedUser);
        };

        fetchUser();

        document.addEventListener('click', handleClickOutsideMenuDiv);
        return () => document.removeEventListener('click', handleClickOutsideMenuDiv);
    }, []);

    return (
        <header className="relative top-0 z-50 w-full flex justify-center">
            <nav className="absolute z-52 container mx-auto px-3 py-3 sm:w-full md:w-[90%] h-20 mt-4 flex justify-between items-center gap-2 rounded-2xl border bg-background shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
                <div className="flex items-center justify-between gap-2">
                    {user && (<SidebarTrigger/>)}
                    <div>
                        <Link href={"/"} className="flex items-center gap-2">
                            <Image src={"/app.svg"} width={60} height={60} alt="logo" priority className="rounded-full" />
                            <span className="text-xl font-bold gradient-text">NoteIt</span>
                        </Link>
                    </div>
                </div>
                <div className="md:flex space-x-6 hidden">
                    <a href="#features" className="hover:text-primary/80 transition">Features</a>
                    <a href="#how-it-works" className="hover:text-primary/80 transition">How It Works</a>
                    <a href="#pricing" className="hover:text-primary/80 transition">Pricing</a>
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <ModeToggle/>
                    <LogoutButton onClick={handleClickInsideMenuDiv}/>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader