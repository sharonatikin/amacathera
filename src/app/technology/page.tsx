import AmacaGelPlatform from '@/components/technology/AmacaGelPlatform'
import AmacaGelProperties from '@/components/technology/AmacaGelProperties'
import AMT143Section from '@/components/technology/AMTSection'
import HydrogelPlatform from '@/components/technology/HydrogelPlatform'
import ResearchSection from '@/components/technology/ResearchSection'
import ShowcaseSection from '@/components/technology/ShowcaseSection'
import TechnologySection from '@/components/technology/TechnologySection'
import TestimonialSection from '@/components/technology/TestimonialSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <TechnologySection/>
      <ShowcaseSection/>
      <ResearchSection/>
      <HydrogelPlatform/>
      <AmacaGelPlatform/>
      <AmacaGelProperties/>
      <AMT143Section/>
      <TestimonialSection/>
    </div>
  )
}

export default page
