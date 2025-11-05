'use client';
import React, { use } from 'react';
import { teamMembers } from '@/const';
import { usePathname } from 'next/navigation';

const ProfileDetail: React.FC = () => {
  const path = usePathname();
  const urlSegment = path.split('/').pop();
  const member = teamMembers.find(m => m.url === urlSegment);
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#003260]  overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 pt-8">
          <div className="flex items-center gap-16">
            {/* Profile Image with Circular Rings */}
            <div className="relative flex-shrink-0">
              {/* Concentric Circles Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-100 h-100 rounded-full border-8 border-[#003260] opacity-30"></div>
                <div className="absolute w-90 h-90 rounded-full border-8 border-[#003260] opacity-30"></div>
                <div className="absolute w-80 h-80 rounded-full border-8 border-slate-500 opacity-40"></div>
                <div className="absolute w-70 h-70 rounded-full border-8 border-slate-400 opacity-50"></div>
              </div>

              {/* Profile Image Circle */}
              <div className="relative z-10 w-80 h-80  overflow-hidden">
                <div className="w-full h-full bg-gradient-to-b from-slate-500 to-slate-700"
                  style={{
                    backgroundImage: 'url("' + member?.image + '")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-slate-800 py-8">
              <h1 className="text-5xl font-bold mb-2">
                {member?.name}<span className="text-3xl font-normal">{member?.colification}</span>
              </h1>
              <p className="text-xl text-slate-700 leading-relaxed max-w-xl">
                {member?.title}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Biography Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="max-w-5xl">
          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            {member?.description}
          </p>

          {/* <p className="text-slate-700 text-lg leading-relaxed">
            Mike completed his PhD in stem cell biology at the University of Durham (U.K.), where he studied controlling 
            cell fate methods. During his postdoctoral work, he investigated combining a hydrogel with neural stem/
            progenitor cells to repair stroke-injured brains in animal models, successfully demonstrating that these cells, 
            combined with a hydrogel, could lead to a functional recovery.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;