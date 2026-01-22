import { Montserrat } from 'next/font/google';
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const Banner = () => {
  return (
    <div className='md:min-h-[80vh] min-h-[100vh] py-10  flex flex-col sm:flex-row relative '>
      <Image 
        src="/images/banner-bg.png"
        alt="Banner background"
        fill
        priority
        className='object-cover hidden sm:inline-block relat object-cente '
      />
      <div className="sm:hidden w-full">
      <img className='min-h-[50vh] relative object-right object-cover sm:hidden' src="/images/banner-bg.png" alt="" />
  <div className="absolute inset-0 bg-gradient-to-t from-white from-25%  " />
      </div>
      <div className=' items-start flex sm:gap-10 gap-5 absolute top-70 flex-col justify-center max-w-2xl sm:pl-7 px-10 pb-10 sm:py-0 sm:px-0 sm:pt-20 sm:relative sm:top-0 z-10 '>
        <h1 className={`text-primary font-bold md:text-4xl sm:text-start text-center text-md ${montserrat.className}`}>
          AmacaThera Signs Exclusive Global Licensing Agreement with Pacira BioSciences for Up To $230 Million
        </h1>
        <p className={`text-primary sm:text-start text-center text-sm  md:text-lg ${montserrat.className}`}>
          Biotech firm AmacaThera has struck a worldwide deal with Pacira BioSciences to licence its long-acting non-opioid pain management platform, AMT-143, receiving a US$5 million upfront payment and up to US$225 million in future milestones. The agreement underscores AmacaThera's tunable hydrogel drug-delivery technology and sets the stage for Pacira to fund development, manufacturing and commercialisation of AMT-143, targeted for 2026.
        </p>
        <Link href={'/news/676b1a1000000000000000a1'} className='bg-primary w-full sm:max-w-70  text-center px-10 py-2 rounded text-white'>
          Click here for Details
        </Link>
      </div>
    </div>
  )
}

export default Banner