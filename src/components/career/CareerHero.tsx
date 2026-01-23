import Image from 'next/image'
import React from 'react'

const CareerHero = () => {
  return (
    <div className='flex flex-col sm:flex-row md:w-full items-center justify-evenly mt-20'>
      <div className='text-primary flex justify-center items-center md:max-w-xl lg:max-w-5xl  '>
        <div className='h-[80vh] sm:h-auto sm:block flex flex-col items-center justify-between'>

        <h1 className='font-bold  lg:text-5xl md:text-4xl sm:text-3xl text-9xl mb-6'>Careers</h1>
        <p className='lg:text-2xl lg:w-2xl md:w-sm sm:w-xs px-5 md:text-xl text-wrap'>With roots in world-leading science, AmacaThera is on a mission to solve some of the stickiest challenges in drug development.</p>
        </div>
      </div>
      <Image className='sm:flex hidden' src="/images/career-bg.png" alt="Hero image" />
      <div className="absolute flex justify-center sm:hidden w-full">
  <Image
    className="relative -top-10"
    src="/images/career-bg.png"
    alt="Hero image"
  />

  <div className="absolute inset-0 bg-gradient-to-b  to-white" />
</div>
    </div>
  )
}

export default CareerHero
