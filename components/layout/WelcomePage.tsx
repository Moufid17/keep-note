import React from 'react'

import WelcomeAppHeader from './WelcomeAppHeader'
import WelcomePageFeaturesSection from './WelcomePageFeaturesSection'
import WelcomePageHeroSection from './WelcomePageHeroSection'
import WelcomePageProcessSection from './WelcomePageProcessSection'
import WelcomePagePricingSection from './WelcomePagePricingSection'
import WelcomePageTestimonalSection from './WelcomePageTestimonalSection'
import WelcomePageCtaSection from './WelcomePageCtaSection'
import WelcomePageFooter from './WelcomePageFooter'

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

       