'use client';
import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

const usersData: User[] = [
  {
    id: 5,
    name: 'Amacathera',
    email: 'admin@amacathera.com',
    createdAt: '25 Jan, 2025'
  },
  {
    id: 6,
    name: 'Atikin Technologies',
    email: 'contact@atikin.tech',
    createdAt: '25 Jan, 2025'
  },
  {
    id: 7,
    name: 'Tech Solutions Inc',
    email: 'support@techsolutions.com',
    createdAt: '24 Jan, 2025'
  },
  {
    id: 8,
    name: 'Innovation Labs',
    email: 'hello@innovationlabs.io',
    createdAt: '23 Jan, 2025'
  }
];

interface UserRowProps {
  user: User;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
    <td className="px-8 py-4">
      <p className="text-sm text-gray-900 font-medium">{user.id}</p>
    </td>
    <td className="px-8 py-4">
      <p className="text-sm text-gray-900 font-medium">{user.name}</p>
    </td>
    <td className="px-8 py-4">
      <p className="text-sm text-gray-700">{user.email}</p>
    </td>
    <td className="px-8 py-4">
      <p className="text-sm text-gray-900 font-medium">{user.createdAt}</p>
    </td>
  </tr>
);

export default function RegisteredUsersTable(): React.ReactElement {
  return (
    <div className="p-8">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Section Header */}
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Registered Users</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">ID</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Name</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Email</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Created At</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Stats */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
          Total Users: <span className="font-semibold">{usersData.length}</span>
        </div>
      </div>
    </div>
  );
}