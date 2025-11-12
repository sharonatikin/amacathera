import BioEngineeringFounder from '@/components/publication/Hero'
import Publication from '@/components/publication/Publication'
import PublicationHero from '@/components/publication/PublicationHero'
import { publications } from '@/const/publication'
import React from 'react'

const page = () => {
  return (
    <div>
      <BioEngineeringFounder />

      <PublicationHero image={'/images/amacagel-bg.png'} title={'AmacaGel Platform'} />
      {publications[0].map((pub, index) => (
        <Publication pub={pub} index={index} />
      ))}

      <PublicationHero image={'/images/biologics-bg.png'} title={'Biologics Cell'} />
      {publications[1].map((pub, index) => (
        <Publication pub={pub} index={index} />
      ))}

      <PublicationHero image={'/images/smallmolecules-bg.png'} title={'Small Molecules'} />
      {publications[2].map((pub, index) => (
        <Publication pub={pub} index={index} />
      ))}

    </div>
  )
}

export default page
