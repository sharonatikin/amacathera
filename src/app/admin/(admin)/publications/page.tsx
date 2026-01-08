'use client';
import Pagination from '@/components/ui/Pagination';
import { Search, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Publication {
  _id: string;
  title: string;
  category: string;
  authors: string;
  journal: string;
  date: string;
  isPublished: boolean;
  publicationDate: string;
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
  data: Publication[];
  pagination: PaginationData;
}

interface PublicationRowProps {
  publication: Publication;
  onDelete: (id: string) => void;
}

const PublicationRow: React.FC<PublicationRowProps> = ({ publication, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this publication?')) return;

    setIsDeleting(true);
    try {
      await onDelete(publication._id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <p className="text-sm text-gray-900 font-medium line-clamp-2">{publication.title}</p>
      </td>
      <td className="px-6 py-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
          {publication.category}
        </span>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600 line-clamp-1">{publication.authors}</p>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600 line-clamp-2">{publication.journal}</p>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-900 font-medium">
          {new Date(publication.publicationDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <Link
            href={`/admin/publications/edit/${publication._id}`}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 text-red-500 hover:bg-red-50 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default function PublicationsDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginationData, setPaginationData] = useState<PaginationData | null>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to first page on search
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch publications with pagination and search
  useEffect(() => {
    fetchPublications();
  }, [currentPage, itemsPerPage, debouncedSearchQuery]);

  const fetchPublications = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage.toString());
      queryParams.append('limit', itemsPerPage.toString());
      if (searchQuery.trim()) {
        queryParams.append('search', searchQuery);
      }

      const response = await fetch(`/api/publications?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch publications: ${response.status} ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();

      if (data.success) {
        setPublications(data.data);
        setPaginationData(data.pagination);
      } else {
        throw new Error('Failed to fetch publications');
      }
    } catch (err) {
      console.error('Error fetching publications:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      toast.error('Failed to load publications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/publications/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete publication');
      }

      const data = await response.json();

      if (data.success) {
        toast.success('Publication deleted successfully');
        fetchPublications();
      } else {
        throw new Error(data.error || 'Failed to delete publication');
      }
    } catch (err) {
      console.error('Error deleting publication:', err);
      toast.error('Failed to delete publication. Please try again.');
      throw err;
    }
  };

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const totalPages = paginationData?.pages || 1;
  const totalCount = paginationData?.total || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Main Content */}
      <div className="p-8">
        {/* Publications Section */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Section Header */}
          <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#0f3a66]">Publications</h2>
              <p className="text-sm text-gray-600 mt-1">Manage all publications</p>
            </div>
            <div className='flex gap-2'>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, author, or category..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white text-black border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  disabled={loading}
                />
              </div>
              <Link
                href={'/admin/publications/create'}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm hover:shadow-md"
              >
                <Plus className="w-5 h-5" />
                Add Publication
              </Link>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
                <p className="mt-4 text-gray-600">Loading publications...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="text-red-500 text-lg font-semibold mb-2">Error Loading Publications</div>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={fetchPublications}
                  className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && publications.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="text-gray-400 text-lg font-semibold mb-2">No Publications Found</div>
                <p className="text-gray-600 mb-4">
                  {searchQuery ? 'No publications match your search.' : 'No publications available.'}
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
          {!loading && !error && publications.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Authors</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Journal</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {publications.map((pub) => (
                      <PublicationRow key={pub._id} publication={pub} onDelete={handleDelete} />
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
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
                Showing <span className="font-semibold">{publications.length}</span> of{' '}
                <span className="font-semibold">{totalCount}</span> publications
                {searchQuery && (
                  <span className="ml-2">
                    (Search: "{searchQuery}")
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}