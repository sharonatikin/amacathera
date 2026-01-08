'use client';
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { Loader2, ArrowLeft, Upload, Calendar, Globe, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
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
}

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const newsId = unwrappedParams.id;
  console.log('Editing news with ID:', newsId);

  const [formData, setFormData] = useState({
    mainHeading: '',
    subHeading: '',
    content: '',
    imageUrl: '',
    date: '',
    isPublished: false
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/news/${newsId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();

        if (data.success && data.data) {
          setFormData({
            mainHeading: data.data.mainHeading || '',
            subHeading: data.data.subHeading || '',
            content: data.data.content || '',
            imageUrl: data.data.imageUrl || '',
            date: data.data.date ? new Date(data.data.date).toISOString().split('T')[0] : '',
            isPublished: data.data.isPublished || false
          });
        } else {
          throw new Error(data.error || 'Failed to load news');
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        toast.error('Failed to load news details');
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      fetchNews();
    }
  }, [newsId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!formData.mainHeading.trim()) {
      setError('Main heading is required');
      return;
    }
    if (!formData.subHeading.trim()) {
      setError('Sub heading is required');
      return;
    }
    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }
    if (!formData.date) {
      setError('Date is required');
      return;
    }

    if (!formData.imageUrl ) {
      setError('Invalid image URL');
      console.log('Invalid image URL:', formData.imageUrl);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`/api/news/${newsId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('News updated successfully');
        setTimeout(() => {
          router.push('/admin/news');
        }, 1500);
      } else {
        throw new Error(data.error || 'Failed to update news');
      }
    } catch (err) {
      console.error('Error updating news:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
          <p className="mt-4 text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/news"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit News</h1>
          <p className="text-gray-600 mt-2">Update news details and publish</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Main Heading */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Main Heading <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="mainHeading"
                value={formData.mainHeading}
                onChange={handleChange}
                placeholder="Enter main heading"
                disabled={submitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all disabled:bg-gray-100"
              />
            </div>

            {/* Sub Heading */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Sub Heading <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subHeading"
                value={formData.subHeading}
                onChange={handleChange}
                placeholder="Enter sub heading"
                disabled={submitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all disabled:bg-gray-100"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all disabled:bg-gray-100"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Image URL (Optional)
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  disabled={submitting}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all disabled:bg-gray-100"
                />
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Enter news content"
                rows={10}
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
                {formData.isPublished ? '✓ This news is published' : 'Publish this news'}
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
                href="/admin/news"
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