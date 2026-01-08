'use client';
import React, { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLogin: string | null;
}

interface AdminRowProps {
  admin: Admin;
}

const AdminRow: React.FC<AdminRowProps> = ({ admin }) => {
  const createdDate = new Date(admin.createdAt).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-8 py-4">
        <p className="text-sm text-gray-900 font-medium">{admin._id.slice(0, 8).toUpperCase()}</p>
      </td>
      <td className="px-8 py-4">
        <p className="text-sm text-gray-900 font-medium">{admin.name}</p>
      </td>
      <td className="px-8 py-4">
        <p className="text-sm text-gray-700">{admin.email}</p>
      </td>
      <td className="px-8 py-4">
        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
          admin.role === 'super-admin'
            ? 'bg-purple-100 text-purple-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {admin.role}
        </span>
      </td>
      <td className="px-8 py-4">
        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
          admin.isActive
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {admin.isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-8 py-4">
        <p className="text-sm text-gray-900 font-medium">{createdDate}</p>
      </td>
      <td className="px-8 py-4">
        <p className="text-sm text-gray-700">
          {admin.lastLogin 
            ? new Date(admin.lastLogin).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            : 'Never'
          }
        </p>
      </td>
    </tr>
  );
};

export default function RegisteredAdminsTable(): React.ReactElement {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAdmins = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admins', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Failed to fetch admins');
        setIsLoading(false);
        return;
      }

      setAdmins(data.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('An error occurred while fetching admins');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="p-8">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Section Header */}
        <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Registered Admins</h2>
          <button
            onClick={fetchAdmins}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-8 mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="px-8 py-12 text-center">
            <div className="inline-block">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 mt-4">Loading admins...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && admins.length === 0 && !error && (
          <div className="px-8 py-12 text-center">
            <p className="text-gray-500">No admins found</p>
          </div>
        )}

        {/* Table */}
        {!isLoading && admins.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">ID</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Name</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Email</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Role</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Status</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Created At</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <AdminRow key={admin._id} admin={admin} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Stats */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>
                  Total Admins: <span className="font-semibold">{admins.length}</span>
                </span>
                <span>
                  Active: <span className="font-semibold text-green-600">{admins.filter(a => a.isActive).length}</span>
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}