'use client';
import { Users, BookOpen, Newspaper, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type StatCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: string | number;
  color?: string;
};

interface ChartDataPoint {
  _id?: string;
  time: string;
  requests: number;
  visitors: number;
}

interface DashboardStats {
  totalAdmins: number;
  totalPublications: number;
  totalNews: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, color = 'bg-gray-200' }) => (
  <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-gray-600 font-medium">{title}</h3>
    </div>
    <p className="text-4xl font-bold text-[#0f3a66]">{value}</p>
  </div>
);

export default function AdminDashboard() {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalAdmins: 0,
    totalPublications: 0,
    totalNews: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch chart data
      const chartResponse = await fetch('/api/dashboard/chart-data');
      const chartResult = await chartResponse.json();
      if (chartResult.success) {
        setChartData(chartResult.data);
      }

      // Fetch statistics
      const statsResponse = await fetch('/api/dashboard/stats');
      const statsResult = await statsResponse.json();
      if (statsResult.success) {
        setStats(statsResult.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
      // Set default data if fetch fails
    } finally {
      setChartData([
        { time: '00:00', requests: 300, visitors: 0 },
        { time: '02:00', requests: 400, visitors: 0 },
        { time: '04:00', requests: 250, visitors: 0 },
        { time: '06:00', requests: 600, visitors: 0 },
        { time: '08:00', requests: 100, visitors: 0 },
        { time: '10:00', requests: 300, visitors: 0 },
        { time: '12:00', requests: 420, visitors: 0 },
        { time: '14:00', requests: 1300, visitors: 0 },
        { time: '16:00', requests: 500, visitors: 0 },
        { time: '18:00', requests: 280, visitors: 0 },
        { time: '20:00', requests: 430, visitors: 0 },
        { time: '22:00', requests: 150, visitors: 0 },
      ]);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="p-8">
        {/* Header with Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Link
            href="/admin/dashboard/chart-data"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <Settings className="w-5 h-5" />
            Manage Chart Data
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Admins"
            value={stats.totalAdmins}
            color="bg-blue-500"
          />
          <StatCard
            icon={BookOpen}
            title="Total Publications"
            value={stats.totalPublications}
            color="bg-green-500"
          />
          <StatCard
            icon={Newspaper}
            title="Total News"
            value={stats.totalNews}
            color="bg-amber-500"
          />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <div className="mb-6 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600 font-medium">Total Requests</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600 font-medium">Unique Visitors</span>
            </div>
          </div>

          {loading ? (
            <div className="h-96 flex items-center justify-center text-gray-500">
              Loading chart data...
            </div>
          ) : chartData.length === 0 ? (
            <div className="h-96 flex items-center justify-center text-gray-500">
              No chart data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="time"
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                  label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}