'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { Loader2, ArrowLeft, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';

interface EditPublicationPageProps {
  params: Promise<{ id: string }>;
}

interface PublicationData {
  _id: string;
  title: string;
  authors: string;
  journal: string;
  date: string;
  category: string;
  abstract: string;
  isPublished: boolean;
}

export default function EditPublicationPage({ params }: EditPublicationPageProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    date: '',
    category: 'AmacaGel Platform',
    abstract: '',
    isPublished: false
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch publication data
  useEffect(() => {
    const fetchPublication = async () => {
      try {
        setLoading(true);
        setError(null);

        const resolvedParams = await params;
        const publicationId = resolvedParams.id;

        console.log('Editing publication with ID:', publicationId);

        const response = await fetch(`/api/publications/${publicationId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch publication');
        }

        const data = await response.json();

        if (data.success && data.data) {
          setFormData({
            title: data.data.title || '',
            authors: data.data.authors || '',
            journal: data.data.journal || '',
            date: data.data.publicationDate ? new Date(data.data.publicationDate).toISOString().split('T')[0] : '',
            category: data.data.category || 'AmacaGel Platform',
            abstract: data.data.abstract || '',
            isPublished: data.data.isPublished || false
          });
        } else {
          throw new Error(data.error || 'Failed to load publication');
        }
      } catch (err) {
        console.error('Error fetching publication:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        toast.error('Failed to load publication details');
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setError(null);
  };

  const handleSubmit = async () => {
    setError('');

    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.authors.length) {
      setError('Authors are required');
      return;
    }
    if (!formData.journal.trim()) {
      setError('Journal is required');
      return;
    }
    if (!formData.date) {
      setError('Publication date is required');
      return;
    }
    if (!formData.abstract.trim()) {
      setError('Abstract is required');
      return;
    }

    setSubmitting(true);
    try {
      const resolvedParams = await params;
      const publicationId = resolvedParams.id;

      const response = await fetch(`/api/publications/${publicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Publication updated successfully');
        setTimeout(() => {
          router.push('/admin/publications');
        }, 1500);
      } else {
        throw new Error(data.error || 'Failed to update publication');
      }
    } catch (err) {
      console.error('Error updating publication:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
          <p className="mt-4 text-gray-600">Loading publication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/publications"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Publications
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Publication</h1>
          <p className="text-gray-600 mt-2">Update publication details</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter publication title"
                disabled={submitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all disabled:bg-gray-100"
              />
            </div>

            {/* Authors Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Authors <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="authors"
                value={formData.authors}
                onChange={handleChange}
                placeholder="Enter author names (comma separated)"
                disabled={submitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all disabled:bg-gray-100"
              />
            </div>

            {/* Journal Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Journal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="journal"
                value={formData.journal}
                onChange={handleChange}
                placeholder="Enter journal name"
                disabled={submitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all disabled:bg-gray-100"
              />
            </div>

            {/* Date Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Publication Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                disabled={submitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all disabled:bg-gray-100"
              />
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={submitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all disabled:bg-gray-100"
              >
                <option>AmacaGel Platform</option>
                <option>Small Molecules</option>
                <option>Polymers</option>
                <option>Hydrogels</option>
                <option>Drug Delivery</option>
              </select>
            </div>

            {/* Abstract Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Abstract <span className="text-red-500">*</span>
              </label>
              <textarea
                name="abstract"
                value={formData.abstract}
                onChange={handleChange}
                placeholder="Enter publication abstract"
                rows={5}
                disabled={submitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none disabled:bg-gray-100"
              />
            </div>

            {/* Publish Status */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                name="isPublished"
                id="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                disabled={submitting}
                className="w-5 h-5 rounded border-gray-300 cursor-pointer"
              />
              <label htmlFor="isPublished" className="text-sm font-semibold text-gray-700 cursor-pointer">
                {formData.isPublished ? '✓ This publication is published' : 'Publish this publication'}
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
              <Link
                href="/admin/publications"
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors flex items-center justify-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}