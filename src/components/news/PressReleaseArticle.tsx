'use client';
import React from 'react';
import { pressReleases } from '@/const';
import { usePathname } from 'next/navigation';

const PressReleaseArticle: React.FC = () => {
    const path = usePathname();
    const urlSegment = path.split('/').pop();
    const article = pressReleases.find(a => a?.id == Number(urlSegment));
  return (
    <div className="min-h-screen  bg-[#EAF3F5] ">
      <div className="max-w-6xl mx-auto px-6 pt-32 py-12">
        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Image */}
          <div className=" rounded-lg overflow-hidden shadow-lg">
            {/* <div className="w-full h-80 bg-gradient-to-br from-slate-600 to-slate-800"></div> */}
            <img
              src={`/images/news/${article?.image}`}
              alt={article?.title}
              className="w-full h-80 object-cover"
            />
          </div>

          {/* Title and Meta */}
          <div className="flex flex-col justify-around">
            <h1 className="text-4xl font-bold text-slate-800 mb-8 leading-tight">
              {article ?.title}
            </h1>
            <p className="text-slate-700">
              <span className="font-semibold">{article?.date}</span>{' '}
              <a href="#" className="text-slate-700 underline hover:text-slate-900">
                Press Release
              </a>
            </p>
          </div>
        </div>

        {/* Article Content */}
        <div className=" p-10">
          <article className="prose prose-slate max-w-none">
            {article?.paragraphs?.map((paragraph, index) => {
              // Check if paragraph starts with "About " to make it a heading
              if (paragraph.startsWith('About ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-slate-800 mt-10 mb-4">
                    {paragraph}
                  </h2>
                );
              }
              
              // Check if it's a very short paragraph (likely a section separator or label)
              if (paragraph.length < 50 && !paragraph.includes('.')) {
                return (
                  <p key={index} className="text-slate-700 leading-relaxed mb-4 font-semibold">
                    {paragraph}
                  </p>
                );
              }
              
              // Regular paragraph - check if it contains URLs to make them links
              const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
              const parts = paragraph.split(urlRegex);
              
              return (
                <p key={index} className="text-slate-700 leading-relaxed mb-6">
                  {parts.map((part, i) => {
                    if (part.match(urlRegex)) {
                      const url = part.startsWith('http') ? part : `https://${part}`;
                      return (
                        <a 
                          key={i} 
                          href={url} 
                          className="text-slate-700 underline hover:text-slate-900"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {part}
                        </a>
                      );
                    }
                    return part;
                  })}
                </p>
              );
            })}
          </article>
        </div>
      </div>
    </div>
  );
};

export default PressReleaseArticle;