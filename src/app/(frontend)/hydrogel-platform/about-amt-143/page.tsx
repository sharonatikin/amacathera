import AMT143InfoCard from '@/components/AMT/AMT143InfoCard'
import AMT143InfoSection from '@/components/AMT/AMT143InfoSection'
import AMTShowSection from '@/components/AMT/AMTShowSection'
import PainReliefHero from '@/components/AMT/PainRelifeHero'
import React from 'react'

const page = () => {
  return (
    <div>
      <AMT143InfoCard/>
      <AMTShowSection />
      <PainReliefHero />
      <AMT143InfoSection />
    </div>
  )
}

export default page
