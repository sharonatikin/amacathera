'use client'
import NewsGrid from '@/components/news/NewsGrid'
import NewsSection from '@/components/news/NewsSection'
import { INews } from '@/types/news'
import React, { useEffect, useState } from 'react'

const page = () => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EAF3F5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003260] mx-auto"></div>
          <p className="mt-4 text-slate-700">Loading article...</p>
        </div>
      </div>
    );
  }
  if (error) return <div>{error}</div>;
  return (
    <>
    <div className='flex bg-white w-screen items-center justify-center pt-[5%]'>
      <div
        className="w-[80%] h-[80%] "
        style={{
          backgroundImage: 'url("/icons/world.png")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        
        <NewsSection newsData={newsData} />
      </div>
    </div>
    <NewsGrid newsData={newsData} />
      </>
  )
}

export default page
