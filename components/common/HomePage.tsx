import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function HomePage() {
  return (
    <section id='homepage' className='relative h-full -mt-[40px] -mx-[16px]'>
        <div className='background-homepage bg-size-[24px_24px] absolute inset-0 z-0'></div>
        <div className={`relative z-1 flex flex-col items-center justify-center h-full mask-radial-at-top-left mask-radial-from-100% `}>
            <h1 className="asolute z-12 text-4xl font-bold text-center whitespace-nowrap overflow-hidden mt-10 typewriter-cursor typewriter-animation">Capture, Organize, and Summarize Your Ideas Effortlessly.</h1>
            <h3 className="-ml-120 text-left mt-4">A simple note-taking app to </h3>
            <div className='text-roller-animation flex flex-col'>
                <h3 className="text-roller text-left mt-4 text-brand-300">Capture your thoughts instantly with a clean, intuitive interface.</h3>
                <h3 className="text-roller text-center mt-4 text-brand-100">Organize your notes seamlessly using labels and color-coded categories.</h3>
                <h3 className="text-roller text-left mt-4 text-brand-300">Summarize your notes using AI-powered tools for quick insights.</h3>
                <h3 className="text-roller text-center mt-4 text-brand-100">Access your notes anytime, anywhere, with cross-device synchronization.</h3>
            </div>
            <div className='closure'></div>
            <div className="absolute z-2 mt-16 flex gap-4 justify-between items-center">
                <Button asChild className="sm:block">
                  <Link href={"/sign-up"} >
                    Start for free
                  </Link>
                </Button>
                <Button asChild variant="outline" >
                  <Link href={"/login"}>
                    Login
                  </Link>
                </Button>
            </div>
        </div>
        <div className='background-homepage2 bg-size-[24px_24px] absolute inset-0 z-0'></div>
    </section>
  )
}

export default HomePage