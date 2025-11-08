import React from 'react'

const PublicationHero = ({image, title}) => {
  return (
    <div 
      className=" flex items-center justify-center w-full h-[50vh] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
        
        {/* Title */}
        <div className="relative z-10  flex items-center justify-center">
          <h1 className="text-6xl md:text-7xl font-bold text-[#0f3a66] tracking-tight">
            {title}
          </h1>
        </div>
      </div>
  )
}

export default PublicationHero
