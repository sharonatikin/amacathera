// lib/searchUtils.ts
// Comprehensive search index for all pages and sections

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  keywords: string[];
  section?: string;
}

export const searchDatabase: SearchResult[] = [
  // Home Page
  {
    id: 'home-hero',
    title: 'Welcome to Amacathera',
    description: 'Leading biotechnology company focused on innovative hydrogel solutions for pain relief',
    url: '/',
    category: 'Home',
    keywords: ['home', 'amacathera', 'biotech', 'hydrogel'],
  },
  {
    id: 'home-innovation',
    title: 'Innovation Platform',
    description: 'Cutting-edge hydrogel platform for breakthrough therapeutic solutions',
    url: '/',
    category: 'Home',
    keywords: ['innovation', 'platform', 'hydrogel', 'technology'],
    section: 'Innovation',
  },

  // About Us
  {
    id: 'about-company',
    title: 'About Amacathera',
    description: 'Company overview, mission, and vision for advancing healthcare',
    url: '/about',
    category: 'About Us',
    keywords: ['about', 'company', 'mission', 'vision'],
  },
  {
    id: 'about-history',
    title: 'Our Story',
    description: 'History and journey of Amacathera from inception to innovation leader',
    url: '/about',
    category: 'About Us',
    keywords: ['history', 'story', 'founded', 'development'],
    section: 'Our Story',
  },

  // Our Team
  {
    id: 'team-leadership',
    title: 'Leadership Team',
    description: 'Meet the experienced executives leading Amacathera',
    url: '/our-team',
    category: 'Company',
    keywords: ['team', 'leadership', 'executives', 'management'],
  },
  {
    id: 'team-board',
    title: 'Board of Directors',
    description: 'Board members bringing expertise and vision to the company',
    url: '/our-team',
    category: 'Company',
    keywords: ['board', 'directors', 'governance', 'advisors'],
    section: 'Board of Directors',
  },
  {
    id: 'team-science',
    title: 'Scientific Team',
    description: 'Renowned scientists and researchers driving innovation',
    url: '/our-team',
    category: 'Company',
    keywords: ['science', 'research', 'scientists', 'experts'],
    section: 'Scientific Team',
  },

  // Hydrogel Platform
  {
    id: 'hydrogel-overview',
    title: 'Hydrogel Platform',
    description: 'Our proprietary hydrogel technology platform for pain management',
    url: '/hydrogel-platform',
    category: 'Technology',
    keywords: ['hydrogel', 'platform', 'technology', 'innovation'],
  },
  {
    id: 'hydrogel-properties',
    title: 'Platform Properties',
    description: 'Key characteristics and advantages of our hydrogel solution',
    url: '/hydrogel-platform',
    category: 'Technology',
    keywords: ['properties', 'characteristics', 'benefits', 'advantages'],
    section: 'Platform Properties',
  },
  {
    id: 'hydrogel-applications',
    title: 'Applications',
    description: 'Clinical and therapeutic applications of our hydrogel platform',
    url: '/hydrogel-platform',
    category: 'Technology',
    keywords: ['applications', 'clinical', 'therapeutic', 'treatment'],
    section: 'Applications',
  },
  {
    id: 'hydrogel-faq',
    title: 'Hydrogel FAQ',
    description: 'Frequently asked questions about our hydrogel platform',
    url: '/hydrogel-platform/freequently-asked-questions',
    category: 'Technology',
    keywords: ['faq', 'questions', 'answers', 'hydrogel'],
    section: 'Frequently Asked Questions',
  },

  // AMT (Product)
  {
    id: 'amt-overview',
    title: 'AMT-143',
    description: 'Our breakthrough pain relief product based on hydrogel technology',
    url: '/AMT',
    category: 'Product',
    keywords: ['amt', 'amt-143', 'product', 'pain relief'],
  },
  {
    id: 'amt-benefits',
    title: 'AMT-143 Benefits',
    description: 'Key benefits and efficacy of AMT-143 treatment',
    url: '/AMT',
    category: 'Product',
    keywords: ['benefits', 'efficacy', 'treatment', 'relief'],
    section: 'Benefits',
  },
  {
    id: 'amt-clinical',
    title: 'Clinical Data',
    description: 'Clinical trial results and efficacy data for AMT-143',
    url: '/AMT',
    category: 'Product',
    keywords: ['clinical', 'trial', 'data', 'efficacy'],
    section: 'Clinical Data',
  },
  {
    id: 'amt-information',
    title: 'AMT-143 Information',
    description: 'Detailed information about AMT-143 composition and mechanism',
    url: '/AMT',
    category: 'Product',
    keywords: ['information', 'composition', 'mechanism', 'details'],
    section: 'Information',
  },

  // Pipeline
  {
    id: 'pipeline-overview',
    title: 'Development Pipeline',
    description: 'Current and upcoming products in our development pipeline',
    url: '/pipeline',
    category: 'Pipeline',
    keywords: ['pipeline', 'development', 'products', 'future'],
  },
  {
    id: 'pipeline-stage1',
    title: 'Pre-Clinical Development',
    description: 'Early-stage research and pre-clinical studies',
    url: '/pipeline',
    category: 'Pipeline',
    keywords: ['pre-clinical', 'research', 'studies', 'development'],
    section: 'Pre-Clinical',
  },
  {
    id: 'pipeline-stage2',
    title: 'Clinical Trials',
    description: 'Ongoing and completed clinical trial programs',
    url: '/pipeline',
    category: 'Pipeline',
    keywords: ['clinical trials', 'phase', 'fda', 'testing'],
    section: 'Clinical Trials',
  },
  {
    id: 'pipeline-stage3',
    title: 'Regulatory Review',
    description: 'Products in regulatory review and approval process',
    url: '/pipeline',
    category: 'Pipeline',
    keywords: ['regulatory', 'approval', 'fda', 'review'],
    section: 'Regulatory Review',
  },

  // News & Events
  {
    id: 'news-overview',
    title: 'News & Events',
    description: 'Latest news, press releases, and company announcements',
    url: '/news',
    category: 'News',
    keywords: ['news', 'events', 'announcements', 'updates'],
  },
  {
    id: 'news-pressrelease',
    title: 'Press Releases',
    description: 'Official company press releases and media updates',
    url: '/news',
    category: 'News',
    keywords: ['press release', 'media', 'announcement', 'news'],
    section: 'Press Releases',
  },
  {
    id: 'news-inthenews',
    title: 'In the News',
    description: 'Coverage of Amacathera in news media and publications',
    url: '/news',
    category: 'News',
    keywords: ['media coverage', 'press', 'article', 'publication'],
    section: 'In the News',
  },
  {
    id: 'news-events',
    title: 'Events',
    description: 'Upcoming conferences, seminars, and company events',
    url: '/news',
    category: 'News',
    keywords: ['event', 'conference', 'seminar', 'webinar'],
    section: 'Events',
  },

  // Publications
  {
    id: 'publications-overview',
    title: 'Publications',
    description: 'Scientific publications and research papers',
    url: '/publications',
    category: 'Research',
    keywords: ['publications', 'research', 'papers', 'scientific'],
  },
  {
    id: 'publications-peerreviewed',
    title: 'Peer-Reviewed Publications',
    description: 'Publications in peer-reviewed scientific journals',
    url: '/publications',
    category: 'Research',
    keywords: ['peer-reviewed', 'journal', 'research', 'scientific'],
    section: 'Peer-Reviewed',
  },
  {
    id: 'publications-presentations',
    title: 'Conference Presentations',
    description: 'Presentations at scientific conferences and symposiums',
    url: '/publications',
    category: 'Research',
    keywords: ['conference', 'presentation', 'symposium', 'abstract'],
    section: 'Presentations',
  },

  // Careers
  {
    id: 'careers-overview',
    title: 'Join Our Team',
    description: 'Career opportunities and employment at Amacathera',
    url: '/career',
    category: 'Careers',
    keywords: ['careers', 'jobs', 'employment', 'opportunities'],
  },
  {
    id: 'careers-positions',
    title: 'Open Positions',
    description: 'Current job openings and available positions',
    url: '/career',
    category: 'Careers',
    keywords: ['positions', 'jobs', 'openings', 'employment'],
    section: 'Open Positions',
  },
  {
    id: 'careers-culture',
    title: 'Company Culture',
    description: 'Our values, culture, and work environment',
    url: '/career',
    category: 'Careers',
    keywords: ['culture', 'values', 'environment', 'team'],
    section: 'Culture',
  },
  {
    id: 'careers-benefits',
    title: 'Benefits & Compensation',
    description: 'Competitive benefits and compensation packages',
    url: '/career',
    category: 'Careers',
    keywords: ['benefits', 'compensation', 'salary', 'healthcare'],
    section: 'Benefits',
  },

  // Contact
  {
    id: 'contact-overview',
    title: 'Contact Us',
    description: 'Get in touch with Amacathera team',
    url: '/contact-us',
    category: 'Contact',
    keywords: ['contact', 'email', 'phone', 'address'],
  },
  {
    id: 'contact-headquarters',
    title: 'Headquarters',
    description: 'Main office location and contact information',
    url: '/contact-us',
    category: 'Contact',
    keywords: ['headquarters', 'office', 'location', 'address'],
    section: 'Headquarters',
  },
  {
    id: 'contact-form',
    title: 'Contact Form',
    description: 'Send us a message through our contact form',
    url: '/contact-us',
    category: 'Contact',
    keywords: ['form', 'message', 'inquiry', 'contact'],
    section: 'Contact Form',
  },
];

// Search function with scoring
export function searchPages(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  const results = searchDatabase
    .map((item) => {
      let score = 0;

      // Exact title match (highest priority)
      if (item.title.toLowerCase() === lowerQuery) score += 100;
      // Title contains query
      else if (item.title.toLowerCase().includes(lowerQuery)) score += 50;

      // Description contains query
      if (item.description.toLowerCase().includes(lowerQuery)) score += 30;

      // Keywords match
      item.keywords.forEach((keyword) => {
        if (keyword === lowerQuery) score += 40;
        else if (keyword.includes(lowerQuery)) score += 20;
      });

      // Category match
      if (item.category.toLowerCase().includes(lowerQuery)) score += 15;

      // Section match
      if (item.section?.toLowerCase().includes(lowerQuery)) score += 10;

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return results;
}