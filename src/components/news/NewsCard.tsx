import React from 'react';
import Image from 'next/image';
import { INews } from '@/types/news';
import Link from 'next/link';



const NewsCard= ({item}:{item: INews}) => {
  console.log(item.date)
  return (
    <div className="flex flex-col sm:flex-row items-center border border-slate-300 rounded-md bg-white p-6 shadow-sm max-w-[680px] w-full gap-6 font-sans">
      {/* Left Aspect Ratio Image Container */}
      <div className="relative w-full sm:w-[240px] aspect-square shrink-0">
        <Image
          src={item?.imageUrl ? `/api/images/${item.imageUrl}` : '/logos/Amaca_Thera_Logo_PNG.png'}
          alt={item?.mainHeading}
          fill
          className="rounded-xl object-cover grayscale brightness-90 contrast-125 mix-blend-multiply"
          priority
        />
        {/* Subtle blue tint overlay to match the image style */}
        <div className="absolute inset-0 bg-[#002d62]/10 rounded-xl pointer-events-none" />
      </div>

      {/* Right Content Section */}
      <div className="flex flex-col flex-1 py-1">
        {/* Meta Row: Date & Category */}
        <div className="flex items-center gap-6 text-[#1e3a60] text-sm font-medium">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>{new Date(item.date).toLocaleDateString(undefined, {year: 'numeric',month: "short", day:'numeric'})}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <a href="#" className="underline underline-offset-4 hover:text-blue-800 transition-colors">
              Press Release
            </a>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="border-slate-200 my-4" />

        {/* Title */}
        <h3 className="text-[#003366] text-[16px] font-bold leading-snug tracking-tight mb-6">
          {item.mainHeading}
        </h3>

        {/* Action Button */}
        <div className="mt-auto">
          <Link href={`/news-and-events/news/${item._id}`}
            className="bg-[#003366] hover:bg-[#002244] text-white text-[15px] font-semibold py-3 px-7 rounded transition-colors duration-200"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;