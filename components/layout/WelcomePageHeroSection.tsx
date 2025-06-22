import React from 'react'
import { Mic, Send } from 'lucide-react'
import { Button } from '../ui/button'

function WelcomePageHeroSection() {
    return (
        <section className="container mx-auto px-4 py-16 md:py-24 mb-34">
            <div className="flex flex-col md:flex-row items-start md:items-center h-full">
                <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
                    <h1 className="typewriter-animation xl:whitespace-nowrap text-3xl md:text-4xl font-bold text-left inline-block mb-6">
                        Your Notes, <span className="gradient-text">Smarter</span> Than Ever
                    </h1>
                    <p className="text-lg lg:text-2xl xl:text-3xl mb-4">
                        NoteIt combines powerful <span className='underline'>speech note-taking</span> with <span className='underline'>AI assistance</span>.
                    </p>
                    <p className='relative inline-block font-bold overflow-hidden h-[1.5em] mb-8 text-lg lg:text-2xl xl:text-3xl'>
                        <span className='animate-text-roll block sm:text-center md:text-left leading-[1.5em]'>
                            <span className='block'><span className="text-brand-500">Express </span>your thoughts effortlessly.</span>
                            <span className='block'><span className="text-brand-500">Organize </span>your notes seamlessly.</span>
                            <span className='block'><span className="text-brand-500">Summarize </span>your notes easily with ai.</span>
                            <span className='block'><span className="text-brand-500">Access </span>them anywhere.</span>
                        </span>
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                        <Button asChild size="lg" className="bg-brand-500 hover:bg-brand-500/90 px-6 h-[50px] font-extrabold transition">
                            <a href="/sign-up?plan=free" className='text-white'>
                                Start for Free
                            </a>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-[50px] dark:bg-background">
                            <a href="#" className="">
                                See Demo
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 relative">
                    <div className="bg-gradient-to-br from-primary to-secondary p-1 rounded-3xl shadow-xl">
                        <div className="bg-white rounded-2xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="h-64 overflow-y-auto">
                                <div className="mb-4">
                                    <p className="text-sm bg-black/95 text-white p-3 rounded-lg"><strong>AI:</strong> What would you like to know about your notes today?</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-black p-3 rounded-lg"><strong>You:</strong> Summarize my meeting notes from yesterday</p>
                                </div>
                                <div>
                                    <p className="text-sm bg-black/95 text-white p-3 rounded-lg"><strong>AI:</strong> Your meeting discussed:<br/>
                                        1. Project timeline extension (2 weeks)<br/>
                                        2. New design mockups approved<br/>
                                        3. Budget increase for marketing
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex">
                                <input type="text" autoFocus placeholder="Ask AI about your notes..." className="w-full flex-1 border border-black rounded-l-lg px-1.5 md:px-4 py-2 text-black/90"/>
                                <button className="bg-black hover:bg-black/90 text-white px-1 md:px-2 rounded-r-lg transition">
                                    <Send/>
                                </button>
                                <button className="bg-black hover:bg-black/90 text-white px-1 md:px-2 rounded-l-lg transition">
                                    <Mic />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -z-10 -top-6 -right-6 w-64 h-64 dark:bg-purple-200 bg-brand-950 rounded-full opacity-30 filter blur-xl"></div>
                </div>
            </div>
        </section>
    )
}

export default WelcomePageHeroSection