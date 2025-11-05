import NewsGrid from '@/components/news/NewsGrid'
import NewsSection from '@/components/news/NewsSection'
import React from 'react'

const page = () => {
  return (
    <>
    <div className='flex w-screen items-center justify-center'>
      <div
        className="w-[80%] h-[80%] "
        style={{
          backgroundImage: 'url("/icons/world.png")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        
        <NewsSection/>
      </div>
    </div>
    <NewsGrid/>
      </>
  )
}

export default page
