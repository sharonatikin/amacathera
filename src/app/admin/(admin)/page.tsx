'use client';
import { Users, BookOpen, Newspaper, LogOut, Home, Menu, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React from 'react';

const chartData = [
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
];

type StatCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: string | number;
  color?: string;
};

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



  return (

    <>
      {/* Main Content */}


        {/* Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={Users}
              title="Total Users"
              value="2"
              color="bg-blue-500"
            />
            <StatCard
              icon={BookOpen}
              title="Total Publications"
              value="14"
              color="bg-green-500"
            />
            <StatCard
              icon={Newspaper}
              title="Total News"
              value="17"
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
          </div>
        </div>
    </>
  );
}