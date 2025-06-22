import { Check, Clock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function WelcomePagePricingSection() {
  return (
    <section id="pricing" className="py-16">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
                <p className="dark:text-white/50 text-black/90 max-w-2xl mx-auto">Choose the plan that fits your needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {/* Free Plan */}
                <div className="bg-secondary rounded-xl overflow-hidden shadow-sm hover:shadow-md transition transform hover:-translate-y-2">
                    <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">Free</h3>
                        <p className="text-gray-600 mb-4">Basic features to get started</p>
                        <div className="mb-4">
                            <span className="text-4xl font-bold">0€</span>
                            <span className="text-gray-500">/month</span>
                        </div>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center">
                                <Check className="text-green-500 mr-2"/>
                                <span>9 questions AI queries/notes/month</span>
                            </li>
                            <li className="flex items-center">
                                <Check className="text-green-500 mr-2"/>
                                <span>Basic note organization</span>
                            </li>
                            <li className="flex items-center">
                                <Check className=" text-green-500 mr-2"/>
                                <span>Sync across unlimited devices</span>
                            </li>
                            <li className="flex items-center text-gray-400">
                                <Clock className="text-gray-400 mr-2"/>
                                <span>Coming soon: Dictate voice note</span>
                            </li>
                        </ul>
                        <Link href={"/sign-up?plan=free"} className="block w-full border border-primary text-primary hover:bg-primary hover:text-white text-center py-3 rounded-lg transition">
                            Get Started
                        </Link> 
                    </div>
                </div>
                
                {/* Premium Plan */}
                <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2">
                    <div className="p-6 text-white">
                        <h3 className="text-xl font-semibold mb-2">Premium</h3>
                        <p className="text-white/80 mb-4">Everything you need for productive notes</p>
                        <div className="mb-4">
                            <span className="text-4xl font-bold">2.99€</span>
                            <span className="opacity-80">/month</span>
                        </div>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center">
                                <Check className=" text-white mr-2"/>
                                <span>Unlimited AI queries</span>
                            </li>
                            <li className="flex items-center">
                                <Check className=" text-white mr-2"/>
                                <span>Advanced organization and tags</span>
                            </li>
                            <li className="flex items-center">
                                <Check className=" text-white mr-2"/>
                                <span>Sync across unlimited devices</span>
                            </li>
                            <li className="flex items-center">
                                <Check className=" text-white mr-2"/>
                                <span>Priority access to new features</span>
                            </li>
                            <li className="flex items-center text-gray-400">
                                <Clock className="text-gray-400 mr-2"/>
                                <span>Coming soon: Dictate voice note</span>
                            </li>
                        </ul>
                        <Link href="/sign-up?plan=premium" className='block w-full bg-white dark:text-black text-primary hover:bg-white/90 text-center px-6 py-3 rounded-sm font-medium transition'>
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default WelcomePagePricingSection