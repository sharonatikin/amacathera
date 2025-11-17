import { Check, CheckCircle } from 'lucide-react'
import React from 'react'
import { pipelineData } from '@/const/pipeling';


const HeroSection = () => {
  const stages = ['Discovery', 'Pre-Clinical', 'Phase 1']
  return (
    <>
    <div className="relative w-screen overflow-hidden">
      <img
        src="/images/pipeline-bg.png"
        alt="Hero"
        className="w-full h-full object-cover"
      />
      <div className='top-30 left-50 absolute'>

          <h1 className='font-extrabold text-[#003d6b] text-[17vw]'>Pipeline</h1>
      </div>
<div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-300"></div>
      {/* Hero Section */}
      <div className="top-130 left-10 absolute w-full flex items-center justify-center px-6 py-20 ">

        <div className=" max-w-2xl">
          <div className="grid grid-cols-6 px-3 py-4 text-[#003d6b]">
            <div className=" col-span-3 font-bold text-sm lg:text-base ">
              Product / Platform
            </div>
            <div className=" font-bold text-sm lg:text-base text-center ">
              Discovery
            </div>
            <div className=" font-bold text-sm lg:text-base text-center ">
              Pre-Clinical
            </div>
            <div className=" font-bold text-sm lg:text-base text-center">
              Phase 1
            </div>
          </div>

          {/* Pipeline Table */}
          <div className="max-w-xl">
            {pipelineData.map((product, idx) => (
                  <div className="grid grid-cols-6 space-y-3 ">
                    {/* Product Info */}
                    <div className=" col-span-3  ">
                        <h3 className="text-base lg:text-lg font-bold text-[#1e3a5f] mb-2">
                          {product.product}
                          <span className='text-[#1e3a5f] ml-1 font-extralight text-xs'>/{product.type}</span>
                        </h3>
                      <p className="text-[#1e3a5f] text-xs lg:text-sm leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Discovery */}
                    <div className="px-4 lg:px-6 py-5 lg:py-6 flex items-center justify-center ">
                      {product.discovery && (
                        <div className="w-10 h-10 lg:w-10 lg:h-10 rounded-full bg-[#003d6b] flex items-center justify-center">
                          <Check className="w-6 h-6 lg:w-7 lg:h-7 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    {/* Pre-Clinical */}
                    <div className="px-4 lg:px-6 py-5 lg:py-6 flex items-center justify-center ">
                      {product.preClinical && (
                        <div className="w-10 h-10 lg:w-10 lg:h-10 rounded-full bg-[#003d6b] flex items-center justify-center">
                          <Check className="w-6 h-6 lg:w-7 lg:h-7 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    {/* Phase 1 */}
                    <div className="px-4 lg:px-6 py-5 lg:py-6 flex items-center justify-center">
                      {product.phase1 && (
                        <div className="w-10 h-10 lg:w-10 lg:h-10 rounded-full bg-[#003d6b] flex items-center justify-center">
                          <Check className="w-6 h-6 lg:w-7 lg:h-7 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </div>
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