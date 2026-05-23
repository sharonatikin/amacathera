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
    const content = [
    {
      image:['icon9.png','icon9-dark.png'],
      description:'Our proprietary hydrogel depot system releases therapeutic agents at the target site for prolonged effect.',
      title:'Advanced Drug Delivery',
      bg:'[#0f3a66]'
    },
    {
      image:['icon11.png','icon11-dark.png'],
      description:'From post-surgical pain to oncology and beyond — we tackle locations conventional delivery struggles to reach.',
      title:'Hard-to-Reach Targets',
      bg:'white'
    },
    {
      image:['icon10.png','icon10-dark.png'],
      description:'Moving rapidly from bench to bedside: GMP manufacturables, human safety data, multi-modal payloads.',
      title:'Clinical Validation',
      bg:'[#0f3a66]'
    },
  ]
  return (
    <div>
      <TechnologySection/>
      <ShowcaseSection/>
      <ResearchSection/>
      <HydrogelPlatform content={content} title='A Unique Hydrogel Platform'/>
      <AmacaGelPlatform/>
      <AmacaGelProperties/>
      <AMT143Section/>
      <TestimonialSection/>
    </div>
  )
}

export default page
