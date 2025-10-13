import React from 'react';
import { Star } from 'lucide-react';
import { ORDERS_DATA, PRODUCTS_DATA } from '../../data/adminData';
import DashboardStats from './DashboardStats';
import Button from '../Button';

const DashboardContent: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Дашборд</h1>
      <DashboardStats />
      
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Последние заказы</h3>
          <div className="space-y-3">
            {ORDERS_DATA.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                <span className="font-bold text-gray-900">₽{order.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" fullWidth className="mt-4">
            Посмотреть все
          </Button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Популярные товары</h3>
          <div className="space-y-3">
            {PRODUCTS_DATA.sort((a, b) => b.sales - a.sales).slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
                  {product.image}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                  <p className="text-xs text-gray-600">{product.sales} продаж</p>
                </div>
                <Star size={18} className="text-amber-400 fill-amber-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;