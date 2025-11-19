import { Montserrat } from 'next/font/google';
import Link from 'next/link'
import React from 'react'
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const Banner = () => {
  return (
    <div className='min-h-[80vh] flex '
    style={{
      background:`url(/images/banner-bg.png)`,
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover',
      backgroundPosition:'center right'
    }}
    >
      <div className='mx-10 items-start flex gap-10 flex-col justify-center max-w-2xl pl-7 pt-20 '>
        <h1 className={`text-primary font-bold md:text-4xl text-2xl ${montserrat.className}`}>AmacaThera Signs Exclusive Global
Licensing Agreement with Pacira
BioSciences for Up To $230 Million</h1>
        <p className={`text-primary text-lg ${montserrat.className}`}>Biotech firm AmacaThera has struck a worldwide deal with Pacira BioSciences to licence its long-acting non-opioid pain management platform, AMT-143, receiving a US$5 million upfront payment and up to US$225 million in future milestones. The agreement underscores AmacaThera’s tunable hydrogel drug-delivery technology and sets the stage for Pacira to fund development, manufacturing and commercialisation of AMT-143, targeted for 2025.

</p>
        <Link href={'/news/0'} className='bg-primary px-10 py-2 rounded text-white'>Click here for Details</Link>
      </div>
      
    </div>
  )
}

export default Banner
