"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button";
import { ModeToggle } from "../common/DarkModeToggle";
import LogoutButton from "../common/LogoutButton";
import { AlignJustify, StickerIcon, StickyNote, StickyNoteIcon } from 'lucide-react';
import { getClientUser } from '@/auth/client';
import { User } from '@supabase/supabase-js';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarTrigger } from '../ui/sidebar';

const AppHeader = () => {
    const [user, setUser] = useState<User | null>(null);
    const isMobile = useIsMobile()
    
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const menuButtonRef = useRef<HTMLButtonElement>(null)

    const handleClickInsideMenuDiv = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
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
                <div className="md:hidden flex justify-between items-center gap-2">
                    <ModeToggle/>
                    <Button id="menu-btn" ref={menuButtonRef} className="focus:outline-none" 
                        onClick={(e) => {
                            e.stopPropagation()
                            const mobileMenuElement = mobileMenuRef.current
                            if (mobileMenuElement) mobileMenuElement.classList.toggle("hidden")
                        }}
                    >
                        <AlignJustify/>
                    </Button>
                </div>
                <div className="hidden md:block">
                    { !isMobile && (
                        user ? (
                            <div className="flex items-center gap-2">
                                <Button asChild size={"sm"}>
                                    <Link href={"/notes"} >
                                        Dashboard
                                    </Link>
                                </Button>
                                <LogoutButton />
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button asChild size={"sm"}>
                                    <Link href={"/sign-up"} >
                                        Get Started
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size={"sm"}>
                                    <Link href={"/login"}>
                                        Login
                                    </Link>
                                </Button>
                            </div>
                        )
                    )}
                </div>
            </nav>
            
            {/* Mobile Menu */}
            <div id="mobile-menu" ref={mobileMenuRef} className="absolute z-52 top-24 hidden md:hidden w-full"
                onClick={handleClickInsideMenuDiv}
            >
                <div className="container px-4 py-3 flex flex-col space-y-3 sm:w-full md:w-[90%] border-t bg-background shadow-md rounded-b-2xl">
                    <a href="#features" className="py-2 hover:text-primary transition">Features</a>
                    <a href="#how-it-works" className="py-2 hover:text-primary transition">How It Works</a>
                    <a href="#pricing" className="py-2 hover:text-primary transition">Pricing</a>
                    {
                        user ? (
                            <>
                                <Button asChild size={"sm"}>
                                    <Link href={"/notes"} >
                                        Dashboard
                                    </Link>
                                </Button>
                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <Button asChild size={"sm"}>
                                    <Link href={"/sign-up"} >
                                        Sign Up
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size={"sm"} className='hover:bg-'>
                                    <Link href={"/login"}>
                                        Login
                                    </Link>
                                </Button>
                            </>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default AppHeader