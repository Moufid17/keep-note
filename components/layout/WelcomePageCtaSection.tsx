import React from 'react'
import Link from 'next/link'

function WelcomePageCtaSection() {
  return (
    <section className="bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Note-Taking?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">Join thousands of users who are already making their notes work smarter, not harder.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Link href="/sign-up?plan=free" className='bg-white dark:text-black text-primary hover:bg-white/90 px-6 py-3 rounded-sm font-medium transition'>
                    Start Free
                </Link>
                <Link href="/#" className='border border-white text-white hover:bg-white/10 px-6 py-3 rounded-sm font-medium transition'>
                    See Live Demo
                </Link>
            </div>
        </div>
    </section>
  )
}

export default WelcomePageCtaSection