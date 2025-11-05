import React from 'react';
import { ArrowRight } from 'lucide-react';
import TeamCard from '../ui/TeamCard';

const BoardOfDirectors: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-16 px-4">
      <div className="flex ">

        <TeamCard member={{
          name: "Paul Austin",
          title: "Founder, The P. Austin Family Foundation",
          description: "Paul Austin is an investor and property developer in Canada and the United...",
          image: "/images/team/paulaustin.png",
          url:"paul-austin"
        }} />
        <div className='flex flex-col items-center'>
          <img src="/icons/Group.png" alt="" />
          <h1 className="text-5xl font-bold text-slate-800 mb-6">Board of Directors</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            In addition to co-founders Mike Cooke and Molly Shoichet, our board is made up of the following:
          </p>
        </div>
        <TeamCard member={{
          name: "Lu Han",
          title: "Partner, Lumira Ventures",
          description: "Lu is passionate about helping entrepreneurs achieving their goals being a co-founder...",
          image: "/images/team/luhan.png",
          url:"lu-han"
        }} />
      </div>
    </div>
  );
};

export default BoardOfDirectors;