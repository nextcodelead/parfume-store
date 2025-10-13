import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { StatItem } from '../../types/admin';
import { STATS } from '../../data/adminData';

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {STATS.map((stat) => (
        <div key={stat.id} className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              {stat.icon}
            </div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {stat.change}
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;