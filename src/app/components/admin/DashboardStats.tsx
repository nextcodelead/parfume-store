import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { StatItem } from '../../types/admin';
import { STATS } from '../../data/adminData';

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {STATS.map((stat) => (
        <div key={stat.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className={`p-2 sm:p-3 rounded-lg ${stat.color}`}>
              <div className="w-5 h-5 sm:w-6 sm:h-6">{stat.icon}</div>
            </div>
            <div className={`flex items-center gap-1 text-xs sm:text-sm font-semibold ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.trend === 'up' ? <TrendingUp size={14} className="sm:w-4 sm:h-4" /> : <TrendingDown size={14} className="sm:w-4 sm:h-4" />}
              {stat.change}
            </div>
          </div>
          <h3 className="text-gray-600 text-xs sm:text-sm mb-1">{stat.title}</h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;