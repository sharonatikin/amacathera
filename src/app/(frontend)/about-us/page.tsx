import AboutHero from '@/components/about/AboutHero'
import BoardOfDirectors from '@/components/about/BoardOfDirectors'
import CollaborationsPartnering from '@/components/about/CollaborationsPartnering'
import Company from '@/components/about/Company'
import Investors from '@/components/about/Investors'
import OurTeam from '@/components/about/OurTeam'
import React from 'react'

const page = () => {
  return (
    <div>
      <AboutHero />
      <Company />
      <OurTeam />
      <BoardOfDirectors />
      {/* <Investors /> */}
      <CollaborationsPartnering />
    </div>
  )
}

export default page
