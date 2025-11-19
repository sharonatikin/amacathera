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
      <div className='mx-10 items-start flex gap-20 flex-col justify-center max-w-xl pl-7'>
        <h1 className='text-primary font-bold text-5xl'>Co-founded by a Bioengineering Pioneer</h1>
        <p className='text-primary text-lg'>Dr. Molly Shoichet is internationally renowned for her innovative biomaterials and therapeutic delivery strategies. Shoichet addresses critical questions in medicine with her multidisciplinary research approach that spans drug discovery to drug delivery.</p>
        <Link href={'/news/0'} className='bg-primary px-10 py-2 rounded'>Click here for Details</Link>
      </div>
      
    </div>
  )
}

export default Banner
