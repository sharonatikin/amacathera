// lib/searchUtils.ts
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
  // Home
  {
    id: 'home-hero',
    title: 'Welcome to AmacaThera',
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

  // About Us — main
  {
    id: 'about-overview',
    title: 'About Us',
    description: 'AmacaThera at the forefront of transforming drug delivery through its hydrogel platform',
    url: '/about-us',
    category: 'About Us',
    keywords: ['about', 'company', 'amacathera', 'overview'],
  },

  // About Us → Company
  {
    id: 'about-company',
    title: 'Company',
    description: 'Headquartered in Toronto, AmacaThera emerged in 2016 as a spin-out from The Shoichet Lab',
    url: '/about-us#company',
    category: 'About Us',
    keywords: ['company', 'toronto', 'shoichet', 'history', 'founded', '2016'],
    section: 'Company',
  },

  // About Us → Our Team
  {
    id: 'about-team',
    title: 'Our Team',
    description: 'Leadership and scientific team bringing expertise in business, science, and engineering',
    url: '/about-us#our-team',
    category: 'About Us',
    keywords: ['team', 'leadership', 'management', 'scientists', 'executives'],
    section: 'Our Team',
  },
  {
    id: 'about-team-senior',
    title: 'Senior Management Team',
    description: 'Meet the executive team including Co-Founders Dr. Mike Cooke and Dr. Molly Shoichet',
    url: '/about-us#our-team',
    category: 'About Us',
    keywords: ['senior', 'management', 'ceo', 'cso', 'cooke', 'shoichet', 'executives'],
    section: 'Senior Management Team',
  },
  {
    id: 'about-team-scientific',
    title: 'Scientific Team',
    description: 'Renowned scientists and researchers driving next-generation therapeutics',
    url: '/about-us#our-team',
    category: 'About Us',
    keywords: ['science', 'research', 'scientists', 'biomaterials', 'formulations'],
    section: 'Scientific Team',
  },

  // About Us → Board of Directors
  {
    id: 'about-board',
    title: 'Board of Directors',
    description: 'Seasoned board providing strategic oversight to advance hydrogel drug delivery',
    url: '/about-us#board-of-directors',
    category: 'About Us',
    keywords: ['board', 'directors', 'governance', 'oversight', 'strategic'],
    section: 'Board of Directors',
  },

  // About Us → Investors
  {
    id: 'about-investors',
    title: 'Investors',
    description: 'AmacaThera is backed by committed investors including Lumira Ventures, BioCapital, MaRS IAF and CCRM',
    url: '/about-us#investors',
    category: 'About Us',
    keywords: ['investors', 'lumira', 'biocapital', 'mars', 'ccrm', 'funding', 'venture'],
    section: 'Investors',
  },

  // About Us → Collaborations and Partnering
  {
    id: 'about-collaborations',
    title: 'Collaborations and Partnering',
    description: 'Partnering with pharmaceutical companies to enhance drug candidates using our hydrogel platform',
    url: '/about-us#collaborations-and-partnering',
    category: 'About Us',
    keywords: ['collaborations', 'partnering', 'pharma', 'partnerships', 'enquiries', 'info@amacathera.com'],
    section: 'Collaborations and Partnering',
  },

  // News
  {
    id: 'news-overview',
    title: 'News',
    description: 'Latest news, press releases, and company announcements',
    url: '/news',
    category: 'News',
    keywords: ['news', 'events', 'announcements', 'updates', 'press'],
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
    description: 'Coverage of AmacaThera in news media and publications',
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

  // Hydrogel Platform (Technology)
  {
    id: 'hydrogel-overview',
    title: 'Hydrogel Platform',
    description: 'Our proprietary hydrogel technology platform for drug delivery',
    url: '/hydrogel-platform',
    category: 'Technology',
    keywords: ['hydrogel', 'platform', 'technology', 'innovation', 'drug delivery'],
  },
  {
    id: 'hydrogel-properties',
    title: 'Platform Properties',
    description: 'Key characteristics and advantages of our hydrogel solution',
    url: '/hydrogel-platform',
    category: 'Technology',
    keywords: ['properties', 'characteristics', 'benefits', 'advantages', 'localized', 'sustained'],
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
    url: '/hydrogel-platform/frequently-asked-questions',
    category: 'Technology',
    keywords: ['faq', 'questions', 'answers', 'hydrogel'],
    section: 'Frequently Asked Questions',
  },

  // Publications (now under Technology)
  {
    id: 'publications-overview',
    title: 'Publications',
    description: 'Scientific publications and research papers from AmacaThera',
    url: '/publications',
    category: 'Technology',
    keywords: ['publications', 'research', 'papers', 'scientific', 'technology'],
  },
  {
    id: 'publications-peerreviewed',
    title: 'Peer-Reviewed Publications',
    description: 'Publications in peer-reviewed scientific journals',
    url: '/publications',
    category: 'Technology',
    keywords: ['peer-reviewed', 'journal', 'research', 'scientific'],
    section: 'Peer-Reviewed',
  },
  {
    id: 'publications-presentations',
    title: 'Conference Presentations',
    description: 'Presentations at scientific conferences and symposiums',
    url: '/publications',
    category: 'Technology',
    keywords: ['conference', 'presentation', 'symposium', 'abstract'],
    section: 'Presentations',
  },

  // Pipeline
  {
    id: 'pipeline-overview',
    title: 'Pipeline',
    description: 'Current and upcoming products in our development pipeline',
    url: '/pipeline',
    category: 'Pipeline',
    keywords: ['pipeline', 'development', 'products', 'future', 'amt-143'],
  },
  {
    id: 'pipeline-preclinical',
    title: 'Pre-Clinical Development',
    description: 'Early-stage research and pre-clinical studies',
    url: '/pipeline',
    category: 'Pipeline',
    keywords: ['pre-clinical', 'research', 'studies', 'development'],
    section: 'Pre-Clinical',
  },
  {
    id: 'pipeline-clinical',
    title: 'Clinical Trials',
    description: 'Ongoing and completed clinical trial programs',
    url: '/pipeline',
    category: 'Pipeline',
    keywords: ['clinical trials', 'phase', 'fda', 'testing'],
    section: 'Clinical Trials',
  },
  {
    id: 'pipeline-regulatory',
    title: 'Regulatory Review',
    description: 'Products in regulatory review and approval process',
    url: '/pipeline',
    category: 'Pipeline',
    keywords: ['regulatory', 'approval', 'fda', 'review'],
    section: 'Regulatory Review',
  },

  // Contact Us
  {
    id: 'contact-overview',
    title: 'Contact Us',
    description: 'Get in touch with the AmacaThera team',
    url: '/contact-us',
    category: 'Contact',
    keywords: ['contact', 'email', 'phone', 'address', 'info@amacathera.com'],
  },
  {
    id: 'contact-headquarters',
    title: 'Headquarters',
    description: 'Main office location in Toronto, Canada',
    url: '/contact-us',
    category: 'Contact',
    keywords: ['headquarters', 'office', 'location', 'address', 'toronto'],
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

      if (item.title.toLowerCase() === lowerQuery) score += 100;
      else if (item.title.toLowerCase().includes(lowerQuery)) score += 50;

      if (item.description.toLowerCase().includes(lowerQuery)) score += 30;

      item.keywords.forEach((keyword) => {
        if (keyword === lowerQuery) score += 40;
        else if (keyword.includes(lowerQuery)) score += 20;
      });

      if (item.category.toLowerCase().includes(lowerQuery)) score += 15;
      if (item.section?.toLowerCase().includes(lowerQuery)) score += 10;

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return results;
}