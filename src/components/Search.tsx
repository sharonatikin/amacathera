// components/Search.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, X, Zap, ArrowRight } from 'lucide-react';
import { searchPages, type SearchResult } from '@/lib/searchUtils';
import Link from 'next/link';

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle search input
  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchPages(query);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
      setSelectedIndex(0);
    }
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }

      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }

      // Arrow key navigation
      if (isOpen && results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const selected = results[selectedIndex];
          if (selected) {
            window.location.href = selected.url;
            setIsOpen(false);
            setQuery('');
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll to selected item
  useEffect(() => {
    const selectedElement = document.querySelector(
      `[data-search-index="${selectedIndex}"]`
    );
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleResultClick = (url: string) => {
    window.location.href = url;
    setIsOpen(false);
    setQuery('');
  };

  // Popular search suggestions
  const suggestions = [
    { title: 'AMT-143', description: 'Our breakthrough pain relief product' },
    {
      title: 'Hydrogel Platform',
      description: 'Our proprietary technology platform',
    },
    { title: 'Pipeline', description: 'Development pipeline and products' },
    { title: 'Our Team', description: 'Leadership and scientific team' },
    { title: 'Careers', description: 'Join our team' },
    { title: 'Publications', description: 'Research and scientific papers' },
  ];

  return (
    <>
      {/* Search Button in Header */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600 text-sm"
        aria-label="Open search"
      >
        <SearchIcon size={18} />
        <span className="hidden lg:inline">Search...</span>
        <kbd className="hidden lg:inline ml-auto text-xs bg-white px-2 py-1 rounded border border-slate-300">
          ⌘K
        </kbd>
      </button>

      {/* Mobile Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-slate-700 hover:text-blue-900 transition"
        aria-label="Open search"
      >
        <SearchIcon size={20} />
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-32 bg-black/30 backdrop-blur-sm">
          <div
            ref={searchRef}
            className="w-full max-w-2xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <SearchIcon className="text-slate-400" size={20} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search pages, sections, and topics..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-lg text-slate-900"
                  autoFocus
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={20} className="text-slate-400" />
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className="hidden md:flex items-center gap-1 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors text-sm text-slate-600"
                >
                  ESC
                </button>
              </div>
            </div>

            {/* Results or Suggestions */}
            <div className="max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {results.map((result, index) => (
                    <div
                      key={result.id}
                      data-search-index={index}
                      onClick={() => handleResultClick(result.url)}
                      className={`px-4 py-3 cursor-pointer transition-colors flex items-start justify-between gap-4 ${
                        selectedIndex === index
                          ? 'bg-blue-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 truncate">
                          {result.title}
                        </p>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {result.description}
                        </p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                            {result.category}
                          </span>
                          {result.section && (
                            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                              {result.section}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="text-slate-400 flex-shrink-0 mt-1" size={18} />
                    </div>
                  ))}
                </div>
              ) : query.trim() ? (
                <div className="px-4 py-12 text-center">
                  <p className="text-slate-600">No results found for "{query}"</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Try searching for different keywords
                  </p>
                </div>
              ) : (
                <div className="p-6">
                  {/* Quick Links */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Zap size={14} />
                      Popular Searches
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion.title}
                          onClick={() => setQuery(suggestion.title)}
                          className="text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <p className="font-medium text-slate-900 text-sm">
                            {suggestion.title}
                          </p>
                          <p className="text-xs text-slate-600">
                            {suggestion.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Help Text */}
                  <div className="text-xs text-slate-500 text-center pt-4 border-t border-gray-200">
                    <p>Press <kbd className="bg-gray-100 px-2 py-1 rounded">↑↓</kbd> to navigate, <kbd className="bg-gray-100 px-2 py-1 rounded">Enter</kbd> to select, <kbd className="bg-gray-100 px-2 py-1 rounded">ESC</kbd> to close</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}