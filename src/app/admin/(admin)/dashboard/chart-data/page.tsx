'use client';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Edit2, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ChartDataPoint {
  _id?: string;
  time: string;
  requests: number;
  visitors: number;
}

export default function ChartDataManagement() {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    time: '',
    requests: '',
    visitors: ''
  });

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/dashboard/chart-data');
      const result = await response.json();

      if (result.success) {
        setChartData(result.data);
      } else {
        throw new Error(result.error || 'Failed to load data');
      }
    } catch (err) {
      console.error('Error fetching chart data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load chart data');
      toast.error('Failed to load chart data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.time.trim()) {
      setError('Time is required');
      return false;
    }
    if (!formData.requests || isNaN(Number(formData.requests))) {
      setError('Requests must be a valid number');
      return false;
    }
    if (!formData.visitors || isNaN(Number(formData.visitors))) {
      setError('Visitors must be a valid number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const url = editingId
        ? `/api/dashboard/chart-data/${editingId}`
        : '/api/dashboard/chart-data';

      const method = editingId ? 'PATCH' : 'POST';

      const payload = {
        time: formData.time,
        requests: Number(formData.requests),
        visitors: Number(formData.visitors)
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save data');
      }

      toast.success(editingId ? 'Data updated successfully' : 'Data added successfully');

      // Refresh chart data
      await fetchChartData();

      // Reset form
      setFormData({ time: '', requests: '', visitors: '' });
      setEditingId(null);
      setShowModal(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: ChartDataPoint) => {
    setFormData({
      time: item.time,
      requests: String(item.requests),
      visitors: String(item.visitors)
    });
    setEditingId(item._id || null);
    setShowModal(true);
    setError(null);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;

    if (!confirm('Are you sure you want to delete this data point?')) {
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(`/api/dashboard/chart-data/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete data');
      }

      toast.success('Data deleted successfully');
      await fetchChartData();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const openAddModal = () => {
    setFormData({ time: '', requests: '', visitors: '' });
    setEditingId(null);
    setError(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ time: '', requests: '', visitors: '' });
    setEditingId(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Manage Chart Data</h1>
            <p className="text-gray-600 mt-2">Add, edit, or delete chart data points</p>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Data Point
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
              Loading data...
            </div>
          ) : chartData.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No chart data yet. Add your first data point!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Requests</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Visitors</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((item, index) => (
                    <tr
                      key={item._id || index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.time}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.requests}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.visitors}</td>
                      <td className="px-6 py-4 text-sm flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(item)}
                          disabled={submitting}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={submitting}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Edit Data Point' : 'Add Data Point'}
              </h2>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              {/* Time Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="e.g., 00:00"
                  disabled={submitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                />
              </div>

              {/* Requests Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Requests <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="requests"
                  value={formData.requests}
                  onChange={handleInputChange}
                  placeholder="e.g., 300"
                  disabled={submitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                />
              </div>

              {/* Visitors Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Visitors <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="visitors"
                  value={formData.visitors}
                  onChange={handleInputChange}
                  placeholder="e.g., 0"
                  disabled={submitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editingId ? 'Update' : 'Add'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}