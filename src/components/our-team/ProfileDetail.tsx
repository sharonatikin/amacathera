'use client';
import React from 'react';
import { teamMembers } from '@/const';
import { usePathname } from 'next/navigation';

const ProfileDetail: React.FC = () => {
  const path = usePathname();
  const urlSegment = path.split('/').pop();
  const member = teamMembers.find(m => m.url === urlSegment);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#003260] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Mobile Layout */}
          <div className="sm:hidden py-8">
            <div className="flex flex-col items-center gap-6">
              {/* Profile Image Circle - Mobile */}
              <div className="relative w-40 h-40 overflow-hidden rounded-full ring-4 ring-slate-300 shadow-lg">
                <div
                  className="w-full h-full bg-gradient-to-b from-slate-500 to-slate-700"
                  style={{
                    backgroundImage: `url("${member?.image}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </div>

              {/* Profile Info - Mobile */}
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white mb-1">
                  {member?.name}
                </h1>
                <p className="text-lg font-normal text-slate-200 mb-3">
                  {member?.colification}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed px-2">
                  {member?.title}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-12 lg:gap-16 pt-6 sm:pt-8 pb-6 md:pb-0">
            {/* Profile Image with Circular Rings - Desktop */}
            <div className="relative flex-shrink-0">
              {/* Concentric Circles Background */}
              <div className="absolute inset-0 hidden sm:flex items-center justify-center">
                <div className="absolute w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-100 lg:h-100 rounded-full border-4 sm:border-6 md:border-8 border-[#003260] opacity-30"></div>
                <div className="absolute w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-90 lg:h-90 rounded-full border-4 sm:border-6 md:border-8 border-[#003260] opacity-30"></div>
                <div className="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full border-4 sm:border-6 md:border-8 border-slate-500 opacity-40"></div>
                <div className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-70 lg:h-70 rounded-full border-4 sm:border-6 md:border-8 border-slate-400 opacity-50"></div>
              </div>

              {/* Profile Image Circle */}
              <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 overflow-hidden rounded-full">
                <div
                  className="w-full h-full bg-gradient-to-b from-slate-500 to-slate-700"
                  style={{
                    backgroundImage: `url("${member?.image}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </div>
            </div>

            {/* Profile Info - Desktop */}
            <div className="flex-1 text-slate-800 py-4 sm:py-6 md:py-8 text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 break-words">
                {member?.name}
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal">{member?.colification}</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed max-w-xl mx-auto md:mx-0">
                {member?.title}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Biography Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="max-w-5xl">
          {/* Mobile Card Style */}
          <div className="sm:hidden bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">About</h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              {member?.description}
            </p>
          </div>

          {/* Desktop Version */}
          <div className="hidden sm:block">
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6">
              {member?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;