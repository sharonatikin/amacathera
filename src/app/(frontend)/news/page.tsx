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

    if (loading) return <div>Loading...</div>;
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
