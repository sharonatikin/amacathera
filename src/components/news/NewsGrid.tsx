import React from 'react';
import { ArrowRight, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import PressReleaseCard from './PressReleaseCard';
import Link from 'next/link';
import { pressReleases } from '@/const';

const NewsGrid: React.FC = () => {

  return (
    <div className="min-h-screen bg-slate-50">
      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pressReleases.map((item, index) => (
            <Link href={`/news/${item.id}`}  key={index} className="bg-white p-3 rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow">
              {/* Image */}
              <div className=" bg-gradient-to-br rounded-lg from-slate-300 to-slate-400 overflow-hidden">
                <img src={`/images/news/${item.image}`} className='w-full h-52' alt="" />
              </div>
              
              {/* Content */}
              <div className="p-8">
                <h3 className="text-slate-800 font-bold text-lg mb-6 leading-tight">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-4">
                  {item.summary}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-slate-200">
                  <div className="text-xs text-slate-500">
                    <div>{item.date}</div>
                    <div className="font-semibold">{item.category}</div>
                  </div>
                  <button className="px-4 py-2 bg-slate-800 text-white text-sm font-semibold rounded hover:bg-slate-700 transition-colors flex items-center gap-2">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>
            // <PressReleaseCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsGrid;