import React from 'react'
import PlatformCard from '../ui/PlatformCard'
import { pipelineContent } from '@/const/pipeling'

const PlatformSection = () => {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-slate-200 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#003d6b] mb-12 sm:mb-16 md:mb-20 text-center">
          Platform
        </h2>

        {/* Desktop View - 3 Column Grid with Lines */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Cards Grid */}
            <div className="grid grid-cols-3 gap-8 lg:gap-12">
              {pipelineContent.map((item, index) => (
                <div key={index} className="relative">


                  {/* Card */}
                  <PlatformCard item={item}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet View - 2-1 Layout */}
        <div className="hidden sm:block md:hidden">
          <div className="space-y-8">
            {/* Top Row - 2 Cards */}
            <div className="grid grid-cols-2 gap-6">
              {pipelineContent.slice(0, 2).map((item) => (
                <PlatformCard item={item}
                />
              ))}
            </div>

            {/* Bottom Row - 1 Card Centered */}
            <div className="flex justify-center">
              <div className="w-full sm:w-1/2">
                <PlatformCard item={pipelineContent[2]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View - Single Column Stack */}
        <div className="sm:hidden">
          <div className="space-y-5">
            {pipelineContent.map((item,ind) => (
              <PlatformCard item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlatformSection
