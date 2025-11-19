'use client';
import React, { useState } from 'react';
import { pressReleases } from '@/const';
import { usePathname } from 'next/navigation';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';

const PressReleaseArticle: React.FC = () => {
    const path = usePathname();
    const urlSegment = path.split('/').pop();
    const article = pressReleases.find(a => a?.id == Number(urlSegment));
    const [isGenerating, setIsGenerating] = useState(false);

  const handleTextBasedPDFDownload = async () => {
    if (!article) return;

    setIsGenerating(true);
    
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      let yPosition = margin;
      const lineHeight = 7;
      const titleLineHeight = 10;

      // Set default font
      pdf.setFont('helvetica', 'normal');

      // Add title
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      const titleLines = pdf.splitTextToSize(article.title, pageWidth - 2 * margin);
      titleLines.forEach((line: string) => {
        if (yPosition + titleLineHeight > pdf.internal.pageSize.getHeight() - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += titleLineHeight;
      });

      yPosition += 5;

      // Add date
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      if (yPosition + lineHeight > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(`Date: ${article.date}`, margin, yPosition);
      yPosition += 10;

      // Add category
      if (yPosition + lineHeight > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(`Category: ${article.category}`, margin, yPosition);
      yPosition += 15;

      // Add summary
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      const summaryLines = pdf.splitTextToSize(article.summary, pageWidth - 2 * margin);
      summaryLines.forEach((line: string) => {
        if (yPosition + lineHeight > pdf.internal.pageSize.getHeight() - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });

      yPosition += 10;

      // Add paragraphs
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      article.paragraphs.forEach(paragraph => {
        // Check if this should be a heading
        if (paragraph.startsWith('About ') || (paragraph.length < 50 && !paragraph.includes('.'))) {
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(11);
        } else {
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
        }

        const lines = pdf.splitTextToSize(paragraph, pageWidth - 2 * margin);
        
        lines.forEach((line: string) => {
          if (yPosition + lineHeight > pdf.internal.pageSize.getHeight() - margin) {
            pdf.addPage();
            yPosition = margin;
            // Reset font for new page
            if (paragraph.startsWith('About ') || (paragraph.length < 50 && !paragraph.includes('.'))) {
              pdf.setFont('helvetica', 'bold');
              pdf.setFontSize(11);
            } else {
              pdf.setFont('helvetica', 'normal');
              pdf.setFontSize(10);
            }
          }
          
          pdf.text(line, margin, yPosition);
          yPosition += lineHeight;
        });

        yPosition += 5; // Add spacing between paragraphs
      });

      const fileName = `${article.title.substring(0, 50).replace(/[^a-zA-Z0-9]/g, '_')}_press_release.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
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
                onClick={handleTextBasedPDFDownload}
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