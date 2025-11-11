
import React from 'react'

const PublicationHero = ({image, title}:{image: string, title: string}) => {
  return (
    <div 
      className="flex items-center justify-center w-full h-[40vh] sm:h-[45vh] md:h-[48vh] lg:h-[50vh] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
        {/* Title */}
        <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 md:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-[#0f3a66] tracking-tight text-center">
            {title}
          </h1>
        </div>
      </div>
  )
}

export default PublicationHero
