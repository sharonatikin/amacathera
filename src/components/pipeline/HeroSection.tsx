import { Check, CheckCircle } from 'lucide-react'
import React from 'react'
import { pipelineData } from '@/const/pipeling';
import Image from 'next/image';

const HeroSection = () => {
  const stages = ['discovery', 'preClinical', 'phase1'] as const
  return (
    <>
      <div className="relative min-h-[200vh] md:min-h-screen w-screen overflow-hidden">
        <Image
          src="/images/pipeline-bg.png"
          alt="Hero"
          className="w-full min-w-200 md:block hidden h-full object-cover"
        />
        <Image
          src="/images/pipeline-mb-bg.png"
          alt="Hero"
          className="w-full pt-18 md:hidden h-full object-cover"
        />
        <div className='md:top-30 md:left-50 top-30 left-10 absolute'>

          <h1 className='font-extrabold text-[#003d6b] text-6xl lg:text-[17vw]'>Pipeline</h1>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-100 via-white/80"></div>
        {/* Hero Section */}
        <div className="md:top-130 md:max-w-2xl top-60 md:left-1/2 md:-translate-x-1/2 absolute w-full flex items-center justify-center px-6 py-20 ">

          <div className=" max-w-105 md:max-w-[50vw]">
            
            <div className="grid grid-cols-6  py-4 text-[#003d6b]">
              <div className=" col-span-3 font-bold text-sm text-start lg:text-base ">
                Product / Platform
              </div>
              <div className=" font-bold text-xs lg:text-base text-center ">
                Discovery
              </div>
              <div className=" font-bold text-xs lg:text-base text-center ">
                Pre-Clinical
              </div>
              <div className=" font-bold text-xs lg:text-base text-center">
                Phase 1
              </div>
            </div>

            {/* Pipeline Table */}
            <div className="max-w-xl h-full">
              {pipelineData.map((product, index) => (
                <div key={index} className="grid grid-cols-6  mb-3">
                  {/* Product Info */}
                  <div className=" col-span-3  ">
                    <h3 className="text-xs lg:text-lg font-bold text-[#1e3a5f] mb-2">
                      {product.product}
                      <span className='text-[#1e3a5f] ml-1 font-extralight text-xs'>/{product.type}</span>
                    </h3>
                    <p className="text-[#1e3a5f] text-xs lg:text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {stages.map((stage: typeof stages[number], index) => {
                    return (
                      <div key={index} className=" lg:px-6 py-5 lg:py-6 flex items-center justify-center ">
                        {product[stage] && (
                          <div className="w-5 h-5 lg:w-10 lg:h-10 rounded-full bg-[#003d6b] flex items-center justify-center">
                            <Check className="w-3 h-3 lg:w-7 lg:h-7 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection