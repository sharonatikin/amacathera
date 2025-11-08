import React from 'react'
import { FileText, ArrowRight } from 'lucide-react';

const Publication = ({pub, index}) => {
  
  return (
    <div className="relative mx-8 md:mx-30">
      {/* Publication Card */}
      <div className={`flex md:flex-row gap-8 items-start py-10 ${
        index % 2  === 0 ? 'md:flex-row-reverse' : 'flex-row'
      }`}>
        
        {/* Document Icon */}
        <div className={`flex flex-1 justify-center `}>
          <img src="/icons/note.png" alt="Document icon" className="" />
        </div>

        {/* Content */}
        <div className={`flex-1 `}>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-[#0f3a66] tracking-wide">
              {pub.date}
            </p>
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
              {pub.title}
            </h2>
            
            <p className="text-base text-slate-700 leading-relaxed">
              {pub.authors}
            </p>
            
            <p className="text-sm text-slate-600 italic">
              {pub.publishedInfo}
            </p>
            
            <div className={`flex flex-wrap gap-4 pt-2`}>
              <button className="bg-[#0f3a66] hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                Abstract
              </button>
              <button className="bg-[#0f3a66] hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg">
                Access PDF
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Divider Wave */}
      <img 
        src="/icons/bar.png" 
        className={`w-full mb-5 ${index % 2 === 0 ? '' : 'scale-x-[-1]'}`} 
        alt="Divider" 
      />
    </div>
  )
}

export default Publication