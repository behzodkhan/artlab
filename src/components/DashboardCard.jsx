import React from 'react';

export default function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg flex items-center space-x-4">
      <div className="p-4 bg-lime-500 text-white rounded-full">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}