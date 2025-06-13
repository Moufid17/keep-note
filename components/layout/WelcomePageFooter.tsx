import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function WelcomePageFooter() {
  return (
    <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center mb-4 gap-2">
                        <Image src={"/app.svg"} width={30} height={30} alt="logo" priority className="rounded-full" />
                        <span className="text-xl font-bold">NoteIt</span>
                    </div>
                    <p className="text-gray-400 mb-4">Making your notes smarter with AI</p>
                    <div className="flex space-x-4">
                        <Twitter className='hover:text-white/50 transition ease-in-out'/>
                        <Facebook className='hover:text-white/50 transition ease-in-out'/>
                        <Linkedin className='hover:text-white/50 transition ease-in-out'/>
                        <Instagram className='hover:text-white/50 transition ease-in-out'/>
                    </div>
                </div>
                
                <div>
                    <h4 className="font-semibold mb-4">Product</h4>
                    <ul className="space-y-2">
                        <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
                        <li><a href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                        <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition">Use Cases</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Integrations</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-semibold mb-4">Resources</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
                        <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition">Tutorials</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-semibold mb-4">Company</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Terms</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400">© {(new Date()).getUTCFullYear()} NoteIt. All rights reserved.</p>
                <p>by <a href="https://www.linkedin.com/in/moufid-mtr" target='_blank'>@Moufid</a></p>
                <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">Cookies</a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default WelcomePageFooter