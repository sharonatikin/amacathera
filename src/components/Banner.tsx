import Link from 'next/link'
import React from 'react'

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
      <div className='mx-10 items-start flex gap-15 flex-col justify-center max-w-2xl pl-7 pt-10 '>
        <h1 className='text-primary font-bold md:text-5xl text-2xl'>AmacaThera Signs Exclusive Global
Licensing Agreement with Pacira
BioSciences for Up To $230 Million</h1>
        <p className='text-primary text-lg'>Validating Its Tunable Drug-Delivery Platform.</p>
        <Link href={'/news/0'} className='bg-primary px-10 py-2 rounded text-white'>Click here for Details</Link>
      </div>
      
    </div>
  )
}

export default Banner
