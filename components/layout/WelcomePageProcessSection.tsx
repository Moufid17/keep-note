import Image from 'next/image'
import React from 'react'

function WelcomePageProcessSection() {
  return (
    <section id="how-it-works" className="py-16">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">How NoteIt Works</h2>
                <p className="dark:text-white/50 text-black/90 max-w-2xl mx-auto">Transform your note-taking experience in just a few simple steps</p>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 items-center">
                <div className="md:w-1/2">
                    <div className="relative">
                        <div className="bg-gradient-to-br from-brand-400 to-brand-500 p-1 rounded-3xl shadow-xl floating">
                            <div className="bg-white rounded-2xl p-8">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <Image src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="NoteIt App"  width="600" height="24" className="rounded-lg shadow"/>
                            </div>
                        </div>
                        <div className="absolute -z-10 -bottom-6 -left-6 w-64 h-64 bg-blue-200 rounded-full opacity-30 filter blur-xl"></div>
                    </div>
                </div>
                
                <div className="md:w-1/2 space-y-8">
                    {/* Step 1 */}
                    <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-500/10 text-brand-500 font-bold text-xl">1</div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Take Notes Your Way</h3>
                            <p className="dark:text-white/50 text-black/90">Write, dictate, or even sketch. NoteIt understands all formats and makes them searchable.</p>
                        </div>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-500/10 text-brand-500 font-bold text-xl">2</div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Ask AI Anything</h3>
                            <p className="dark:text-white/50 text-black/90">Simply ask questions about your notes and get instant, intelligent answers.</p>
                        </div>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-500/10 text-brand-500 font-bold text-xl">3</div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Get Organized Automatically</h3>
                            <p className="dark:text-white/50 text-black/90">NoteIt intelligently categorizes and tags your content for easy retrieval later.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default WelcomePageProcessSection