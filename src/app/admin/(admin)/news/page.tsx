'use client';
import Pagination from '@/components/ui/Pagination';
import { Search, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NewsItem {
  _id: string;
  mainHeading: string;
  subHeading: string;
  date: string;
  content: string;
  imageUrl?: string;
  isPublished: boolean;
  viewCount: number;
  formattedDate?: string;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface ApiResponse {
  success: boolean;
  data: NewsItem[];
  pagination: PaginationData;
}

interface NewsRowProps {
  news: NewsItem;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, currentStatus: boolean) => void;
}

const NewsRow: React.FC<NewsRowProps> = ({ news, onDelete, onTogglePublish }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this news item?')) return;
    
    setIsDeleting(true);
    try {
      await onDelete(news._id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async () => {
    setIsToggling(true);
    try {
      await onTogglePublish(news._id, news.isPublished);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <p className="text-sm text-gray-900 font-semibold line-clamp-2">{news.mainHeading}</p>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-700 line-clamp-2">{news.subHeading}</p>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-900 font-medium whitespace-nowrap">
          {news.formattedDate || new Date(news.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        {/* <p className="text-xs text-gray-500 mt-1">{news.viewCount} views</p> */}
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-700 line-clamp-2">{news.content.substring(0, 100)}...</p>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col gap-2">
          <Link
            href={`/admin/news/edit/${news._id}`}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 justify-center"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={handleTogglePublish}
            disabled={isToggling}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 justify-center ${
              news.isPublished
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isToggling ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : news.isPublished ? (
              'Unpublish'
            ) : (
              'Publish'
            )}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default function NewsDashboard(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [paginationData, setPaginationData] = useState<PaginationData | null>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to first page on search
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch news data with pagination and search
  useEffect(() => {
    fetchNews();
  }, [currentPage, itemsPerPage, debouncedSearchQuery]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage.toString());
      queryParams.append('limit', itemsPerPage.toString());
      if (searchQuery.trim()) {
        queryParams.append('search', searchQuery);
      }

      const response = await fetch(`/api/news?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();

      if (data.success) {
        setNewsData(data.data);
        setPaginationData(data.pagination);
      } else {
        throw new Error('Failed to fetch news');
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      toast.error('Failed to load news. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete news item');
      }

      const data = await response.json();

      if (data.success) {
        toast.success('News item deleted successfully');
        // Refetch news to update the list
        fetchNews();
      } else {
        throw new Error(data.error || 'Failed to delete news item');
      }
    } catch (err) {
      console.error('Error deleting news:', err);
      toast.error('Failed to delete news item. Please try again.');
      throw err;
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPublished: !currentStatus
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update news status');
      }

      const data = await response.json();

      if (data.success) {
        // Update the item in state
        setNewsData(prev => prev.map(news =>
          news._id === id ? { ...news, isPublished: !currentStatus } : news
        ));
        toast.success(`News ${!currentStatus ? 'published' : 'unpublished'} successfully`);
      } else {
        throw new Error(data.error || 'Failed to update news status');
      }
    } catch (err) {
      console.error('Error updating news status:', err);
      toast.error('Failed to update news status. Please try again.');
      throw err;
    }
  };

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page
  };

  const totalPages = paginationData?.pages || 1;
  const totalCount = paginationData?.total || 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Main Content */}
      <div className="p-8">
        {/* News Section */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Section Header */}
          <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">News Management</h2>
              <p className="text-sm text-gray-600 mt-1">Manage all news and press releases</p>
            </div>
            <div className='flex gap-4'>
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by heading or content..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  disabled={loading}
                />
              </div>
              {/* Add News Button */}
              <Link
                href={'/admin/news/add'}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm hover:shadow-md"
              >
                <Plus className="w-5 h-5" />
                Add News
              </Link>
              {/* Refresh Button */}
              <button
                onClick={fetchNews}
                disabled={loading}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Refresh'
                )}
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
                <p className="mt-4 text-gray-600">Loading news...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="text-red-500 text-lg font-semibold mb-2">Error Loading News</div>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={fetchNews}
                  className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && newsData.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="text-gray-400 text-lg font-semibold mb-2">No News Found</div>
                <p className="text-gray-600 mb-4">
                  {searchQuery ? 'No news items match your search.' : 'No news items available.'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => handleSearch('')}
                    className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Table */}
          {!loading && !error && newsData.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Main Heading</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sub Heading</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Content Preview</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsData.map((news) => (
                      <NewsRow
                        key={news._id}
                        news={news}
                        onDelete={handleDelete}
                        onTogglePublish={handleTogglePublish}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Component */}
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalPages={totalPages}
                setItemsPerPage={handleItemsPerPageChange}
                setCurrentPage={setCurrentPage}
              />

              {/* Footer Stats */}
              <div className="px-8 py-4 bg-gray-50 border-gray-200 flex justify-between items-center text-sm text-gray-600">
                <div>
                  Showing <span className="font-semibold">{newsData.length}</span> of{' '}
                  <span className="font-semibold">{totalCount}</span> news items
                  {searchQuery && (
                    <span className="ml-2">
                      (Search: "{searchQuery}")
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}