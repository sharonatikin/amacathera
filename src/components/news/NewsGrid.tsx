'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import PressReleaseCard from './PressReleaseCard';
import Link from 'next/link';
import { pressReleases } from '@/const';
import { INews } from '@/types/news';

const NewsGrid: React.FC = () => {
  const [newsData, setNewsData] = useState<INews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        if (data.success) {
          setNewsData(data.data);
        }
      } catch (err) {
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    }
    
    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((item, index) => (
            <Link href={`/news/${item._id}`}  key={index} className="bg-white p-3 rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow">
              {/* Image */}
              <div className=" bg-gradient-to-br rounded-lg from-slate-300 to-slate-400 overflow-hidden">

                <img
                  src={item?.imageUrl ? `/images/news/${item.imageUrl}` : '/logos/Amaca_Thera_Logo_PNG.png'}
                  alt={item?.mainHeading}
                  className="w-full h-52"
                  crossOrigin="anonymous"
                />
              </div>
              
              {/* Content */}
              <div className="p-8">
                <h3 className="text-slate-800 font-bold text-lg mb-6 leading-tight">
                  {item.mainHeading}
                </h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-4">
                  {item.subHeading}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-slate-200">
                  <div className="text-xs text-slate-500">
                    <div>{item.date.toISOString().split('T')[0]}</div>
                    <div className="font-semibold">press release</div>
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