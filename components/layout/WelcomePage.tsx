import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import WelcomeAppHeader from './WelcomeAppHeader'
import WelcomePageFeaturesSection from './WelcomePageFeaturesSection'
import WelcomePageHeroSection from './WelcomePageHeroSection'
import WelcomePageProcessSection from './WelcomePageProcessSection'
import WelcomePagePricingSection from './WelcomePagePricingSection'
import WelcomePageTestimonalSection from './WelcomePageTestimonalSection'
import WelcomePageCtaSection from './WelcomePageCtaSection'
import WelcomePageFooter from './WelcomePageFooter'


const FirstSection = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-44px)] flex items-center justify-center px-4 sm:px-8 md:px-12">
        <div className="relative z-2 flex flex-col items-center gap-4 h-full mask-radial-at-top-left mask-radial-from-100%">
          <h1 className="typewriter-animation xl:whitespace-nowrap text-2xl lg:text-5xl xl:text-4xl font-bold text-center bg-brand-500 dark:bg-gradient-to-r dark:from-brand-500 dark:to-brand-100 inline-block text-transparent bg-clip-text">
            Capture, Organize, and Summarize Your Ideas Effortlessly.
          </h1>
          <div className='md:inline-flex items-baseline gap-2 text-xl font-bold h-[1.5em]'>
            <h3 className={`whitespace-nowrap text-center`}>A simple note-taking app to</h3>
            <span className='relative inline-block overflow-hidden h-[1.5em]'>
              <span className='animate-text-roll block sm:text-center md:text-left leading-[1.5em]'>
                <span className='block text-brand-500'>Capture your thoughts instantly</span>
                <span className='block text-brand-400'>Organize your notes seamlessly</span>
                <span className='block text-brand-500'>Summarize your notes easily</span>
                <span className='block text-brand-400'>Access them anywhere</span>
              </span>
            </span>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/sign-up">Start for free</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#">Our Plans</Link>
            </Button>
          </div>
        </div>
      </section>
  )
}

function WelcomePage() {
  return (
    <div id="welcomepage" className='relative w-full h-screen'>
      <div className='background-image-before absolute z-1 bg-size-[24px_24px] inset-0'></div>
      <WelcomeAppHeader />
      <div className='relative z-2 h-full mt-[44px]'>
        <WelcomePageHeroSection />
        <div className='container mx-auto bg-primary/10 dark:bg-primary/20 rounded-2xl'>
          <WelcomePageFeaturesSection />
          <WelcomePageProcessSection />
          <WelcomePagePricingSection />
          <WelcomePageTestimonalSection />
          <WelcomePageCtaSection />
          <WelcomePageFooter />
        </div>
      </div>
      <div className='background-image-after absolute z-1 bg-size-[24px_24px] inset-0'></div>
    </div>
  )
}

export default WelcomePage

       