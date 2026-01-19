import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function SitemapPage() {
  const sitemapSections = [
    {
      title: 'Main Pages',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Our Team', href: '/our-team' },
        { label: 'Contact Us', href: '/contact-us' },
      ],
    },
    {
      title: 'Products & Technology',
      links: [
        { label: 'AMT-143', href: '/AMT' },
        { label: 'Hydrogel Platform', href: '/hydrogel-platform' },
        { label: 'Hydrogel FAQ', href: '/hydrogel-platform/freequently-asked-questions', isSubsection: true },
      ],
    },
    {
      title: 'Development & Research',
      links: [
        { label: 'Pipeline', href: '/pipeline' },
        { label: 'Publications', href: '/publications' },
      ],
    },
    {
      title: 'News & Events',
      links: [
        { label: 'News & Events', href: '/news' },
      ],
    },
    {
      title: 'Careers',
      links: [
        { label: 'Join Our Team', href: '/career' },
      ],
    },
    {
      title: 'Legal & Information',
      links: [
        { label: 'Sitemap', href: '/sitemap' },
      ],
    },
  ];

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 py-20 px-4 sm:px-6 lg:px-8">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 sm:px-8 py-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            Sitemap
          </h1>
          <p className="text-blue-100 text-lg">
            Complete Navigation Guide for Amacathera
          </p>
        </div>

        {/* Breadcrumb */}
        <div className="px-6 sm:px-8 py-4 border-b border-gray-200 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Sitemap</span>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-8">
          <div className="space-y-8">
            {sitemapSections.map((section, sectionIdx) => (
              <div key={sectionIdx} className="space-y-4">
                {/* Section Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-blue-600">
                    {section.title}
                  </h2>
                </div>

                {/* Section Links */}
                <ul className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className={`border-b border-gray-100 last:border-b-0 ${
                        link.isSubsection ? 'bg-blue-50' : 'bg-white'
                      }`}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between px-5 py-4 transition-all duration-200 group ${
                          link.isSubsection
                            ? 'ml-6 text-gray-700 hover:text-blue-600'
                            : 'text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <span className={`font-medium ${link.isSubsection ? 'text-sm' : ''}`}>
                          {link.isSubsection && (
                            <span className="mr-2">→</span>
                          )}
                          {link.label}
                        </span>
                        <ChevronRight
                          size={18}
                          className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick Reference Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Reference</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Pages</p>
                <p className="text-2xl font-bold text-blue-600">11</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Main Categories</p>
                <p className="text-2xl font-bold text-purple-600">6</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Subsections</p>
                <p className="text-2xl font-bold text-cyan-600">1</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-blue-600">Tip:</span> Use the search feature (Cmd+K or Ctrl+K) to quickly find pages and sections.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}