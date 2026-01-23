import React from 'react';
import { ArrowRight } from 'lucide-react';
import TeamCard from '../ui/TeamCard';
import Image from 'next/image';


const BoardOfDirectors: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Mobile & Tablet Layout (< lg) */}
        <div className="lg:hidden space-y-8">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <Image src="/icons/Group.png" alt="" className="w-16 h-16 sm:w-20 sm:h-20 mb-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
              Board of Directors
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed px-4">
              In addition to co-founders Mike Cooke and Molly Shoichet, our board is made up of the following:
            </p>
          </div>

          {/* Team Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <TeamCard member={{
              name: "Paul Austin",
              title: "Founder, The P. Austin Family Foundation",
              description: "Paul Austin is an investor and property developer in Canada and the United...",
              image: "/images/team/paulaustin.png",
              url: "paul-austin"
            }} />
            <TeamCard member={{
              name: "Lu Han",
              title: "Partner, Lumira Ventures",
              description: "Lu is passionate about helping entrepreneurs achieving their goals being a co-founder...",
              image: "/images/team/luhan.png",
              url: "lu-han"
            }} />
          </div>
        </div>

        {/* Desktop Layout (≥ lg) - Original Design */}
        <div className="hidden lg:flex">
          <TeamCard member={{
            name: "Paul Austin",
            title: "Founder, The P. Austin Family Foundation",
            description: "Paul Austin is an investor and property developer in Canada and the United...",
            image: "/images/team/paulaustin.png",
            url: "paul-austin"
          }} />
          <div className='flex flex-col text-center items-center'>
            <Image src="/icons/Group.png" alt="" />
            <h1 className="text-5xl font-bold text-slate-800 m-6">Board of Directors</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              In addition to co-founders Mike Cooke and Molly Shoichet, our board is made up of the following:
            </p>
          </div>
          <TeamCard member={{
            name: "Lu Han",
            title: "Partner, Lumira Ventures",
            description: "Lu is passionate about helping entrepreneurs achieving their goals being a co-founder...",
            image: "/images/team/luhan.png",
            url: "lu-han"
          }} />
        </div>
      </div>
    </div>
  );
};

export default BoardOfDirectors;