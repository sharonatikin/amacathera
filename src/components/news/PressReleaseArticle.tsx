'use client';
import React, { useState } from 'react';
import { pressReleases } from '@/const';
import { usePathname } from 'next/navigation';
import { Download } from 'lucide-react';
import type { jsPDF } from 'jspdf';
import type html2canvas from 'html2canvas';

const PressReleaseArticle: React.FC = () => {
    const path = usePathname();
    const urlSegment = path.split('/').pop();
    const article = pressReleases.find(a => a?.id == Number(urlSegment));
    const [isGenerating, setIsGenerating] = useState(false);

  const handlePressReleaseDownload = async () => {
    setIsGenerating(true);
    try {
      // Get the article content
      const contentElement = document.getElementById('press-release-content');
      
      if (!contentElement) {
        throw new Error('Content element not found');
      }

      // Dynamically import jsPDF and html2canvas
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;

      // Create canvas from HTML element
      const canvas = await html2canvas(contentElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#EAF3F5'
      });

      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      // Add image to PDF
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download PDF
      pdf.save(`${article?.title?.replace(/\s+/g, '_') || 'Press_Release'}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate press release PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div  className="min-h-screen bg-[#EAF3F5]">
      <div className="max-w-6xl mx-auto px-6 pt-32 py-12">
        {/* Header Section */}
        <div id="press-release-content" className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={`/images/news/${article?.image}`}
              alt={article?.title}
              className="w-full h-80 object-cover"
              crossOrigin="anonymous"
            />
          </div>

          {/* Title and Meta */}
          <div className="flex flex-col justify-around">
            <h1 className="text-4xl font-bold text-slate-800 mb-8 leading-tight">
              {article?.title}
            </h1>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-slate-700">
                  <span className="font-semibold">{article?.date}</span>
                </p>
              </div>
              <button
                onClick={handlePressReleaseDownload}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 bg-[#003260] text-white rounded-lg hover:bg-[#004a8f] transition-all duration-300 font-semibold text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Download size={18} />
                {isGenerating ? 'Generating...' : 'Press Release'}
              </button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-10">
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