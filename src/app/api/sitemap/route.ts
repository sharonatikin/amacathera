// app/api/sitemap/route.ts
import { NextResponse } from 'next/server';
import News from '@/lib/models/News';
import Publication from '@/lib/models/Publication';
import { connectDB } from '@/lib/mongodb';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://amacathera.com';

// Static pages that don't require database queries
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.9', changefreq: 'monthly' },
  { url: '/contact-us', priority: '0.8', changefreq: 'monthly' },
  { url: '/AMT', priority: '0.9', changefreq: 'monthly' },
  { url: '/hydrogel-platform', priority: '0.9', changefreq: 'monthly' },
  { url: '/hydrogel-platform/freequently-asked-questions', priority: '0.8', changefreq: 'monthly' },
  { url: '/pipeline', priority: '0.8', changefreq: 'monthly' },
  { url: '/our-team', priority: '0.8', changefreq: 'monthly' },
  { url: '/career', priority: '0.8', changefreq: 'weekly' },
  { url: '/news', priority: '0.8', changefreq: 'weekly' },
  { url: '/publications', priority: '0.8', changefreq: 'monthly' },
];

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export async function GET() {
  try {
    // Connect to database
    await connectDB();

    // Fetch dynamic content
    const newsArticles = await News.find().select('_id updatedAt').lean();
    const publications = await Publication.find().select('_id updatedAt').lean();

    // Build sitemap entries
    const dynamicEntries: SitemapEntry[] = [];

    // Add news articles
    newsArticles.forEach((article: any) => {
      dynamicEntries.push({
        url: `/news/${article._id}`,
        lastmod: new Date(article.updatedAt).toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7',
      });
    });

    // Add publications
    publications.forEach((pub: any) => {
      dynamicEntries.push({
        url: `/publications/${pub._id}`,
        lastmod: new Date(pub.updatedAt).toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7',
      });
    });

    // Combine static and dynamic entries
    const allEntries: SitemapEntry[] = [
      ...staticPages.map(page => ({
        ...page,
        lastmod: new Date().toISOString().split('T')[0],
      })),
      ...dynamicEntries,
    ];

    // Generate XML
    const xml = generateSitemapXML(allEntries);

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

function generateSitemapXML(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      entry => `  <url>
    <loc>${BASE_URL}${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}