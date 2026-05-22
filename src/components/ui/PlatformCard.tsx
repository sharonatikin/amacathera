'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const PlatformCard = ({item}:{item:{ bg:string, image: string[], title: string, description: string}}) => {
  const [hovered, setHovered] = useState(false)
  const isDark = item.bg !== "white"

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group hover:bg-white bg-[#0f3a66] shadow-2xl hover:shadow-4xl transition-shadow duration-300 rounded-2xl p-8 h-full min-h-96 flex flex-col justify-between`}
    >
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <Image
          src={`/icons/${hovered && item.image[1] ? item.image[1] : item.image[0]}`}
          alt={item.title}
          width={56}
          height={56}
        />
      </div>

      {/* Title */}
      <h3 className={`text-2xl font-bold text-center mb-4 transition-colors duration-300 group-hover:text-[#0f3a66] text-white`}>
        {item.title}
      </h3>

      {/* Description */}
      <p className={`text-base leading-relaxed text-center transition-colors duration-300 group-hover:text-[#0f3a66] text-white `}>
        {item.description}
      </p>
    </div>
  )
}

export default PlatformCard