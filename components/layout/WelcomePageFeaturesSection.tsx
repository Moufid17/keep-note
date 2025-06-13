import { Bot, Brain, FolderOpen, Mic, RefreshCcw, Search, ShieldHalf } from 'lucide-react'
import React from 'react'

function WelcomePageFeaturesSection() {
    return (
        <section id="features" className="container mx-auto px-4 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
                    <p className="dark:text-white/50 text-black/90 max-w-2xl mx-auto">NoteIt gives you everything you need for productive note-taking and beyond</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                                <Brain className="text-brand-600 text-xl size-8"/>
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Premium</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">AI Note Insights</h3>
                        <p className="text-gray-600">Ask questions about your notes and get instant answers from our powerful AI assistant.</p>
                    </div>
                    {/* Feature 2 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                            <Search className="text-brand-600 text-xl size-8"/>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
                        <p className="text-gray-600">Find exactly what you're looking for with natural language search across all your notes.</p>
                    </div>
                    {/* Feature 3 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                            <RefreshCcw className="text-brand-600 text-xl size-8"/>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Cross-Device Sync</h3>
                        <p className="text-gray-600">Access your notes anywhere, on all your devices with real-time synchronization.</p>
                    </div>
                    {/* Feature 4 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                                <Mic className="text-brand-600 text-xl size-8"/>
                            </div>
                            <div className='flex gap-1'>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Premium</span>
                                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">Coming Soon</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Speech to Text</h3>
                        <p className="text-gray-600">Dictate your thoughts and let NoteIt convert your speech into accurate, editable notes instantly.</p>
                    </div>
                    {/* Feature 5 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                                <FolderOpen className="text-brand-600 text-xl size-8"/>
                            </div>
                            <div className='flex gap-1'>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Premium</span>
                                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">Coming Soon</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Organize Effortlessly</h3>
                        <p className="text-gray-600">Nested folders, tags, and smart categories keep your notes perfectly organized.</p>
                    </div>
                    {/* Feature 6 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                                <Bot className="text-brand-600 text-xl size-8"/>
                            </div>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Premium</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">AI Summarization</h3>
                        <p className="text-gray-600">Get concise summaries of long notes or multiple related notes with a single click.</p>
                    </div>
                    {/* Feature 7 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                                <ShieldHalf className="text-brand-600 text-xl size-8"/>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
                        <p className="text-gray-600">Your notes are private and secure with military-grade encryption.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WelcomePageFeaturesSection
