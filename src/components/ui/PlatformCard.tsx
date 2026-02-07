import Image from 'next/image'
import React from 'react'

const PlatformCard = ({item}:{item:{ bg:string, image: string, title: string, description: string}}) => {
  return (
            <div className={`relative bg-${item.bg} shadow-2xl hover:shadow-4xl transition-shadow duration-300 rounded-2xl p-8 h-full min-h-96 flex flex-col justify-between`}>
              {/* Arrow icon */}
                        {/* <svg className={`w-[140%] h-12 `} viewBox="0 0 1200 50" preserveAspectRatio="none">
            <line x1="770" y1="25" x2="850" y2="25" stroke={`${item.bg !== "white" ? "white" : "#0f3a66"} `} strokeWidth="2" opacity="0.5" />
            <polygon points="860,25 850,20 850,30" fill={`${item.bg !== "white" ? "white" : "#0f3a66"} `} opacity="0.5" />
          </svg> */}
              {/* <ArrowRight className="w-6 h-6 text-white opacity-60 self-end mb-4" /> */}
              
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <Image 
                  src={`/icons/${item.image}`} 
                  alt={item.title}
                  width={48}
                  height={48}
                />
              </div>

              {/* Title */}
              <h3 className={`text-2xl font-bold ${item.bg !== "white" ? "text-white" : "text-[#0f3a66]"} text-center mb-4`}>
                {item.title}
              </h3>

              {/* Description */}
              <p className={`text-base ${item.bg !== "white" ? "text-white" : "text-[#0f3a66]"} leading-relaxed text-center`}>
                {item.description}
              </p>
            </div>
  )
}

export default PlatformCard