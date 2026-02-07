import { PublicationType } from '@/types/publications';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const Publication = ({pub, index}:{pub: PublicationType,index: number}) => {
  
  return (
    <div className="relative mx-4 sm:mx-6 md:mx-12 lg:mx-20 xl:mx-30">
      {/* Publication Card */}
      <div className={`flex flex-col md:flex-row gap-6 md:gap-8 items-start py-8 md:py-10 ${
        index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}>
        
        {/* Document Icon */}
        <div className="flex flex-1 justify-center w-full md:w-auto">
          <Image 
            src="/icons/note.png" 
            alt="Document icon"
            width={160}
            height={160}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-auto md:h-auto max-w-full object-contain" 
          />
        </div>

        {/* Content */}
        <div className="flex-1 w-full">
          <div className="space-y-3 md:space-y-4">
            <p className="text-xs sm:text-sm font-semibold text-[#0f3a66] tracking-wide">
              {pub.publicationDate} &bull; {pub.journal}
            </p>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
              {pub.title}
            </h2>
            
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {pub.authors.join(', ')}
            </p>
            
            <p className="text-xs sm:text-sm text-slate-600 italic">
              {pub.abstract}
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
              {
                pub.abstractUrl && (
              <a href={pub.abstractUrl} className="bg-[#0f3a66] hover:bg-blue-800 text-white font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto">
                Abstract
              </a>
              )}
              {
              pub.pdfUrl && (
              <a href={pub.pdfUrl} className="bg-[#0f3a66] hover:bg-blue-800 text-white font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto">
                Access PDF
                <ArrowRight className="w-4 h-4" />
              </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Divider Wave */}
      <Image 
        src="/icons/bar.png"
        width={400}
        height={100}
        className={`w-full mb-4 md:mb-5 ${index % 2 === 0 ? '' : 'scale-x-[-1]'}`} 
        alt="Divider" 
      />
    </div>
  )
}

export default Publication