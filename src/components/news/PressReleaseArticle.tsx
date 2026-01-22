'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';

// Update the interface to match News schema
interface INewsArticle {
  _id: string;
  mainHeading: string;
  subHeading: string;
  date: string;
  pressReleaseLink?: string;
  imageUrl?: string;
  fileName?: string;
  fileSize?: number;
  videoUrl?: string;
  content: string;
  uploadedBy: string;
  viewCount: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const PressReleaseArticle: React.FC = () => {
  const path = usePathname();
  const urlSegment = path.split('/').pop();
  const [article, setArticle] = useState<INewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);
        // Fetch from backend API using the ID from URL
        const res = await fetch(`/api/news/${urlSegment}`);
        const data = await res.json();
        
        if (data.success) {
          setArticle(data.data);
        } else {
          setError(data.error || 'Article not found');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    }

    if (urlSegment) {
      fetchArticle();
    }
  }, [urlSegment]);

  // Function to parse content into paragraphs
  const parseContentToParagraphs = (content: string): string[] => {
    if (!content) return [];
    
    // Split by double line breaks or create logical paragraphs
    const paragraphs = content.split(/\n\s*\n/);
    
    // Filter out empty paragraphs and trim whitespace
    return paragraphs
      .filter(p => p.trim().length > 0)
      .map(p => p.trim());
  };

  // Function to detect if a paragraph should be a heading
  const isHeadingParagraph = (paragraph: string): boolean => {
    return (
      paragraph.startsWith('About ') ||
      paragraph.startsWith('Introduction') ||
      paragraph.startsWith('Conclusion') ||
      paragraph.startsWith('Key Highlights') ||
      paragraph.startsWith('Background') ||
      paragraph.startsWith('Contact:') ||
      (paragraph.length < 100 && paragraph.includes(':')) ||
      paragraph.toUpperCase() === paragraph // All caps might be a heading
    );
  };

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

      // Add main heading (title)
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      const titleLines = pdf.splitTextToSize(article.mainHeading, pageWidth - 2 * margin);
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
      pdf.text(`Date: ${new Date(article.date).toLocaleDateString()}`, margin, yPosition);
      yPosition += 10;

      // Add sub heading (summary)
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      const subHeadingLines = pdf.splitTextToSize(article.subHeading, pageWidth - 2 * margin);
      subHeadingLines.forEach((line: string) => {
        if (yPosition + lineHeight > pdf.internal.pageSize.getHeight() - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });

      yPosition += 10;

      // Parse and add content paragraphs
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const paragraphs = parseContentToParagraphs(article.content);
      paragraphs.forEach(paragraph => {
        if (!paragraph) return;
        
        // Check if this should be a heading
        if (isHeadingParagraph(paragraph)) {
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
            if (isHeadingParagraph(paragraph)) {
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

      // Add press release link if available
      if (article.pressReleaseLink) {
        yPosition += 10;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text('For more information:', margin, yPosition);
        yPosition += 7;
        pdf.setFont('helvetica', 'italic');
        pdf.textWithLink(article.pressReleaseLink, margin, yPosition, { url: article.pressReleaseLink });
      }

      const fileName = `${article.mainHeading.substring(0, 50).replace(/[^a-zA-Z0-9]/g, '_')}_press_release.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

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

  if (error || !article) {
    return (
      <div className="min-h-screen bg-[#EAF3F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Article Not Found</h1>
          <p className="text-slate-700 mb-6">{error || 'The requested article could not be found.'}</p>
          <a 
            href="/news" 
            className="px-6 py-3 bg-[#003260] text-white rounded-lg hover:bg-[#004a8f] transition-all duration-300 font-semibold"
          >
            Back to News
          </a>
        </div>
      </div>
    );
  }

  const paragraphs = parseContentToParagraphs(article.content);

  return (
    <div className="min-h-screen bg-[#EAF3F5]">
      <div className="max-w-6xl mx-auto px-6 pt-32 py-12">
        {/* Header Section */}
        <div id="press-release-content" className="flex justify-center mb-12">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-8 leading-tight">
              {article.mainHeading}
            </h1>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-slate-700">
                  <span className="font-semibold">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
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

        {/* Sub Heading */}
        {/* <div className="mb-8">
          <p className="text-xl text-slate-700 font-semibold leading-relaxed">
            {article.subHeading}
          </p>
        </div> */}

        {/* Article Content */}
        <div className="p-10">
          <article className="prose prose-slate max-w-none">
            {paragraphs.map((paragraph, index) => {
              if (!paragraph) return null;
              
              // Check if paragraph should be a heading
              if (isHeadingParagraph(paragraph)) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-slate-800 mt-10 mb-4">
                    {paragraph}
                  </h2>
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

        {/* Additional Information */}
        <div className="mt-12 pt-8 border-t border-slate-300">
          <div className="flex flex-wrap gap-6">
            {article.pressReleaseLink && (
              <div>
                <p className="text-sm text-slate-600 mb-2">Press Release Link:</p>
                <a 
                  href={article.pressReleaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#003260] underline hover:text-[#004a8f]"
                >
                  {article.pressReleaseLink}
                </a>
              </div>
            )}
            
            {article.videoUrl && (
              <div>
                <p className="text-sm text-slate-600 mb-2">Related Video:</p>
                <a 
                  href={article.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#003260] underline hover:text-[#004a8f]"
                >
                  Watch Video
                </a>
              </div>
            )}
            
            {article.fileName && (
              <div>
                <p className="text-sm text-slate-600 mb-2">Attached File:</p>
                <p className="text-slate-700">{article.fileName} {article.fileSize && `(${(article.fileSize / 1024).toFixed(0)} KB)`}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressReleaseArticle;