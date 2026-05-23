import { Syringe, Beaker, ArrowRight, Sparkles } from 'lucide-react';
import PlatformCard from '../ui/PlatformCard';

export default function HydrogelPlatform({content, title}:{content: {image:string[],description:string,title:string,bg:string}[], title?:string}) {

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 py-20">
      {/* Container */}
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl lg:text-6xl font-bold text-[#0f3a66] text-center mb-24">
          {title}
        </h1>

        {/* Cards Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Card - Advanced Drug Delivery */}
          {content.map((item)=>
            <PlatformCard key={item.title} item={item} />
          )}
        </div>

        {/* Connecting lines - desktop only */}
        {/* <div className="hidden lg:block mt-12">
          <svg className="w-full h-12" viewBox="0 0 1200 50" preserveAspectRatio="none">
            <line x1="770" y1="25" x2="850" y2="25" stroke="#0f3a66" strokeWidth="2" opacity="0.5" />
            <polygon points="860,25 850,20 850,30" fill="#0f3a66" opacity="0.5" />
          </svg>
        </div> */}
      </div>
    </div>
  );
}