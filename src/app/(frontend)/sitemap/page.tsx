// 'use client';
// import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

// export default function SitemapComponent() {
//   const [expandedSections, setExpandedSections] = useState({
//     staticPages: true,
//     dynamicPages: true,
//     xmlInfo: false,
//     implementation: false,
//     bestPractices: false,
//   });
//   const [copiedCode, setCopiedCode] = useState(null);

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const copyToClipboard = (text, key) => {
//     navigator.clipboard.writeText(text);
//     setCopiedCode(key);
//     setTimeout(() => setCopiedCode(null), 2000);
//   };

//   const staticPages = [
//     { url: '/', name: 'Homepage', changefreq: 'weekly', priority: '1.0' },
//     { url: '/about', name: 'About Us', changefreq: 'monthly', priority: '0.9' },
//     { url: '/contact-us', name: 'Contact Us', changefreq: 'monthly', priority: '0.8' },
//     { url: '/AMT', name: 'AMT Product', changefreq: 'monthly', priority: '0.9' },
//     { url: '/hydrogel-platform', name: 'Hydrogel Platform', changefreq: 'monthly', priority: '0.9' },
//     { url: '/hydrogel-platform/freequently-asked-questions', name: 'Hydrogel FAQ', changefreq: 'monthly', priority: '0.8' },
//     { url: '/pipeline', name: 'Pipeline', changefreq: 'monthly', priority: '0.8' },
//     { url: '/our-team', name: 'Our Team', changefreq: 'monthly', priority: '0.8' },
//     { url: '/career', name: 'Careers', changefreq: 'weekly', priority: '0.8' },
//     { url: '/news', name: 'News', changefreq: 'weekly', priority: '0.8' },
//     { url: '/publications', name: 'Publications', changefreq: 'monthly', priority: '0.8' },
//   ];

//   const dynamicPages = [
//     { url: '/news/[id]', name: 'News Articles', changefreq: 'monthly', priority: '0.7' },
//     { url: '/publications/[id]', name: 'Publication Details', changefreq: 'monthly', priority: '0.7' },
//     { url: '/our-team/[id]', name: 'Team Member Profiles', changefreq: 'monthly', priority: '0.7' },
//   ];

//   const xmlTags = [
//     { tag: '<loc>', description: 'The complete URL (required)', example: 'https://amacathera.com/about' },
//     { tag: '<lastmod>', description: 'Last modification date (YYYY-MM-DD)', example: '2024-01-16' },
//     { tag: '<changefreq>', description: 'Suggested crawl frequency (Google ignores this)', example: 'weekly' },
//     { tag: '<priority>', description: 'Relative priority 0.0-1.0 (Google ignores this)', example: '0.9' },
//   ];

//   const implementationSteps = [
//     {
//       step: 1,
//       title: 'Create Sitemap Route Handler',
//       description: 'Create app/api/sitemap/route.ts with dynamic generation logic',
//       details: 'This will auto-fetch news articles and publications from your database'
//     },
//     {
//       step: 2,
//       title: 'Add robots.txt',
//       description: 'Create public/robots.txt file that references your sitemap',
//       details: 'This tells search engines where to find your sitemap'
//     },
//     {
//       step: 3,
//       title: 'Set Environment Variables',
//       description: 'Update .env.local with NEXT_PUBLIC_BASE_URL',
//       details: 'e.g., https://amacathera.com'
//     },
//     {
//       step: 4,
//       title: 'Submit to Google',
//       description: 'Submit sitemap via Google Search Console',
//       details: 'Navigate to Sitemaps section and enter URL'
//     },
//     {
//       step: 5,
//       title: 'Monitor Performance',
//       description: 'Track coverage and crawl statistics',
//       details: 'Check the Sitemaps report regularly'
//     },
//   ];

//   const bestPractices = [
//     '✅ UTF-8 Encoding - Proper file encoding',
//     '✅ Absolute URLs - Full URLs with domain',
//     '✅ Canonical URLs - Single version of each page',
//     '✅ Last Modified Dates - Accurate update tracking',
//     '✅ Proper Location - Accessible at root level',
//     '✅ robots.txt Reference - Easy discovery',
//     '✅ Size Limits - Under 50MB and 50,000 URLs',
//     '✅ Mobile Friendly - Works for all versions',
//   ];

//   const routeHandlerCode = `// app/api/sitemap/route.ts
// import { NextResponse } from 'next/server';
// import News from '@/lib/models/News';
// import Publication from '@/lib/models/Publication';
// import { connectDB } from '@/lib/mongodb';

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://amacathera.com';

// const staticPages = [
//   { url: '/', priority: '1.0', changefreq: 'weekly' },
//   { url: '/about', priority: '0.9', changefreq: 'monthly' },
//   // ... more pages
// ];

// export async function GET() {
//   try {
//     await connectDB();
//     const newsArticles = await News.find().select('_id updatedAt').lean();
//     const publications = await Publication.find().select('_id updatedAt').lean();

//     const dynamicEntries = [
//       ...newsArticles.map(article => ({
//         url: \`/news/\${article._id}\`,
//         lastmod: new Date(article.updatedAt).toISOString().split('T')[0],
//         changefreq: 'monthly',
//         priority: '0.7',
//       })),
//       ...publications.map(pub => ({
//         url: \`/publications/\${pub._id}\`,
//         lastmod: new Date(pub.updatedAt).toISOString().split('T')[0],
//         changefreq: 'monthly',
//         priority: '0.7',
//       })),
//     ];

//     const allEntries = [
//       ...staticPages.map(page => ({
//         ...page,
//         lastmod: new Date().toISOString().split('T')[0],
//       })),
//       ...dynamicEntries,
//     ];

//     const xml = generateSitemapXML(allEntries);

//     return new NextResponse(xml, {
//       headers: {
//         'Content-Type': 'application/xml; charset=utf-8',
//         'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
//       },
//     });
//   } catch (error) {
//     return new NextResponse('Error generating sitemap', { status: 500 });
//   }
// }

// function generateSitemapXML(entries) {
//   const urls = entries
//     .map(
//       entry => \`  <url>
//     <loc>\${BASE_URL}\${entry.url}</loc>
//     <lastmod>\${entry.lastmod}</lastmod>
//     <changefreq>\${entry.changefreq}</changefreq>
//     <priority>\${entry.priority}</priority>
//   </url>\`
//     )
//     .join('\\n');

//   return \`<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// \${urls}
// </urlset>\`;
// }`;

//   const robotsTxtCode = `# Robots.txt for Amacathera
// # Place this file in the public folder (public/robots.txt)

// User-agent: *
// Allow: /

// Disallow: /admin
// Disallow: /admin/*
// Disallow: /api/admin*
// Disallow: /api/auth*

// Crawl-delay: 1

// Sitemap: https://amacathera.com/api/sitemap
// Sitemap: https://amacathera.com/sitemap.xml`;

//   const envCode = `NEXT_PUBLIC_BASE_URL=https://amacathera.com
// MONGODB_URI=your_mongodb_connection_string`;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-12">
//           <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
//             <h1 className="text-4xl font-bold text-gray-900 mb-3">Amacathera Sitemap</h1>
//             <p className="text-lg text-gray-600">Google-Compliant XML Sitemap Implementation Guide</p>
//             <p className="text-sm text-gray-500 mt-3">Complete sitemap structure, implementation steps, and best practices</p>
//           </div>
//         </div>

//         {/* Static Pages Section */}
//         <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
//           <button
//             onClick={() => toggleSection('staticPages')}
//             className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-between transition-colors"
//           >
//             <div className="text-left">
//               <h2 className="text-xl font-bold">Static Pages</h2>
//               <p className="text-sm text-blue-100">{staticPages.length} main pages</p>
//             </div>
//             {expandedSections.staticPages ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
//           </button>
          
//           {expandedSections.staticPages && (
//             <div className="p-6">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead>
//                     <tr className="border-b-2 border-gray-300 bg-gray-50">
//                       <th className="text-left py-3 px-4 font-semibold">URL</th>
//                       <th className="text-left py-3 px-4 font-semibold">Page Name</th>
//                       <th className="text-center py-3 px-4 font-semibold">Priority</th>
//                       <th className="text-center py-3 px-4 font-semibold">Change Freq</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {staticPages.map((page, idx) => (
//                       <tr key={idx} className="border-b hover:bg-blue-50 transition-colors">
//                         <td className="py-3 px-4 font-mono text-blue-600">{page.url}</td>
//                         <td className="py-3 px-4">{page.name}</td>
//                         <td className="py-3 px-4 text-center font-semibold text-amber-600">{page.priority}</td>
//                         <td className="py-3 px-4 text-center text-gray-600">{page.changefreq}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Dynamic Pages Section */}
//         <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
//           <button
//             onClick={() => toggleSection('dynamicPages')}
//             className="w-full px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-between transition-colors"
//           >
//             <div className="text-left">
//               <h2 className="text-xl font-bold">Dynamic Pages</h2>
//               <p className="text-sm text-purple-100">Auto-generated from database</p>
//             </div>
//             {expandedSections.dynamicPages ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
//           </button>
          
//           {expandedSections.dynamicPages && (
//             <div className="p-6">
//               <div className="bg-purple-50 p-4 rounded-lg mb-4">
//                 <p className="text-sm text-gray-700 mb-3">These pages are dynamically generated from your MongoDB database:</p>
//                 <div className="grid gap-3">
//                   {dynamicPages.map((page, idx) => (
//                     <div key={idx} className="bg-white p-4 rounded border-l-4 border-purple-400">
//                       <p className="font-mono text-purple-600 font-semibold">{page.url}</p>
//                       <p className="text-gray-600 text-sm mt-1">{page.name}</p>
//                       <div className="flex gap-4 mt-2 text-xs">
//                         <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">Priority: {page.priority}</span>
//                         <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">Freq: {page.changefreq}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* XML Tags Info */}
//         <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
//           <button
//             onClick={() => toggleSection('xmlInfo')}
//             className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white flex items-center justify-between transition-colors"
//           >
//             <div className="text-left">
//               <h2 className="text-xl font-bold">XML Tags Information</h2>
//               <p className="text-sm text-green-100">Understanding sitemap structure</p>
//             </div>
//             {expandedSections.xmlInfo ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
//           </button>
          
//           {expandedSections.xmlInfo && (
//             <div className="p-6">
//               <div className="grid gap-4">
//                 {xmlTags.map((item, idx) => (
//                   <div key={idx} className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
//                     <p className="font-mono text-green-700 font-bold text-lg">{item.tag}</p>
//                     <p className="text-gray-700 mt-2">{item.description}</p>
//                     <p className="text-sm text-gray-600 mt-2">Example: <code className="bg-white px-2 py-1 rounded">{item.example}</code></p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Implementation Steps */}
//         <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
//           <button
//             onClick={() => toggleSection('implementation')}
//             className="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-between transition-colors"
//           >
//             <div className="text-left">
//               <h2 className="text-xl font-bold">Implementation Steps</h2>
//               <p className="text-sm text-indigo-100">5 steps to deploy your sitemap</p>
//             </div>
//             {expandedSections.implementation ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
//           </button>
          
//           {expandedSections.implementation && (
//             <div className="p-6">
//               <div className="space-y-4">
//                 {implementationSteps.map((step, idx) => (
//                   <div key={idx} className="border-l-4 border-indigo-500 pl-4">
//                     <div className="flex items-center gap-3 mb-2">
//                       <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
//                         {step.step}
//                       </div>
//                       <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
//                     </div>
//                     <p className="text-gray-700 ml-11 mb-1">{step.description}</p>
//                     <p className="text-sm text-gray-600 ml-11 bg-indigo-50 p-2 rounded">{step.details}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Code Examples */}
//         <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="px-6 py-4 bg-gray-800 text-white flex items-center justify-between">
//             <h2 className="text-xl font-bold">Code Templates</h2>
//           </div>
          
//           <div className="p-6 space-y-6">
//             {/* Route Handler */}
//             <div className="border-l-4 border-gray-400">
//               <h3 className="font-bold text-lg mb-2 text-gray-900">app/api/sitemap/route.ts</h3>
//               <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm relative">
//                 <pre>{routeHandlerCode}</pre>
//                 <button
//                   onClick={() => copyToClipboard(routeHandlerCode, 'handler')}
//                   className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
//                 >
//                   {copiedCode === 'handler' ? <Check size={18} /> : <Copy size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Robots.txt */}
//             <div className="border-l-4 border-gray-400">
//               <h3 className="font-bold text-lg mb-2 text-gray-900">public/robots.txt</h3>
//               <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm relative">
//                 <pre>{robotsTxtCode}</pre>
//                 <button
//                   onClick={() => copyToClipboard(robotsTxtCode, 'robots')}
//                   className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
//                 >
//                   {copiedCode === 'robots' ? <Check size={18} /> : <Copy size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Environment Variables */}
//             <div className="border-l-4 border-gray-400">
//               <h3 className="font-bold text-lg mb-2 text-gray-900">.env.local</h3>
//               <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm relative">
//                 <pre>{envCode}</pre>
//                 <button
//                   onClick={() => copyToClipboard(envCode, 'env')}
//                   className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
//                 >
//                   {copiedCode === 'env' ? <Check size={18} /> : <Copy size={18} />}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Best Practices */}
//         <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
//           <button
//             onClick={() => toggleSection('bestPractices')}
//             className="w-full px-6 py-4 bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-between transition-colors"
//           >
//             <div className="text-left">
//               <h2 className="text-xl font-bold">Best Practices</h2>
//               <p className="text-sm text-amber-100">Google-compliant implementation</p>
//             </div>
//             {expandedSections.bestPractices ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
//           </button>
          
//           {expandedSections.bestPractices && (
//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {bestPractices.map((practice, idx) => (
//                   <div key={idx} className="bg-amber-50 p-4 rounded-lg border border-amber-200">
//                     <p className="text-gray-800 text-sm">{practice}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Quick Reference */}
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-8 text-white">
//           <h2 className="text-2xl font-bold mb-4">Quick Reference</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-white/20 p-4 rounded-lg">
//               <p className="text-blue-100 text-sm">API Endpoint</p>
//               <p className="font-mono text-white">/api/sitemap</p>
//             </div>
//             <div className="bg-white/20 p-4 rounded-lg">
//               <p className="text-blue-100 text-sm">Total Static Pages</p>
//               <p className="font-mono text-white">{staticPages.length}</p>
//             </div>
//             <div className="bg-white/20 p-4 rounded-lg">
//               <p className="text-blue-100 text-sm">Dynamic Collections</p>
//               <p className="font-mono text-white">{dynamicPages.length}</p>
//             </div>
//           </div>
//           <div className="mt-6 pt-6 border-t border-white/30">
//             <p className="text-blue-100 text-sm mb-2">Submit to Google Search Console:</p>
//             <p className="font-mono text-white">https://amacathera.com/api/sitemap</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/(frontend)/sitemap/page.tsx

import { Metadata } from 'next';
import SitemapPage from '@/components/sitemap/SitemapPage';

export const metadata: Metadata = {
  title: 'Sitemap - Amacathera',
  description: 'Complete navigation guide for all pages and sections on Amacathera website. Find all resources, products, team information, and more.',
  keywords: ['sitemap', 'navigation', 'site map', 'pages', 'links'],
  openGraph: {
    title: 'Sitemap - Amacathera',
    description: 'Complete navigation guide for Amacathera website',
    type: 'website',
    url: 'https://amacathera.com/sitemap',
  },
};

export default function Page() {
  return <SitemapPage />;
}