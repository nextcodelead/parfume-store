import React from 'react';
import { Search, Filter, Download, Eye, MoreVertical } from 'lucide-react';
import { Order } from '../../types/admin';
import { ORDERS_DATA } from '../../data/adminData';
import Button from '../Button';

const OrdersTable: React.FC = () => {
  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    const labels = {
      pending: 'Ожидание',
      processing: 'Обработка',
      shipped: 'Отправлен',
      delivered: 'Доставлен',
      cancelled: 'Отменен'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Заказы</h2>
          <div className="flex gap-3">
            <Button variant="outline" leftIcon={<Filter size={20} />}>
              Фильтры
            </Button>
            <Button variant="outline" leftIcon={<Download size={20} />}>
              Экспорт
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Поиск по номеру заказа или имени клиента..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Номер</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Клиент</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Дата</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Товары</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Сумма</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Статус</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ORDERS_DATA.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-rose-600">{order.id}</td>
                <td className="px-6 py-4 text-gray-900">{order.customer}</td>
                <td className="px-6 py-4 text-gray-700">{order.date}</td>
                <td className="px-6 py-4 text-gray-700">{order.items}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">₽{order.total.toFixed(2)}</td>
                <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">Показано 1-5 из 1,234 заказов</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Назад</Button>
          <Button variant="outline" size="sm">1</Button>
          <Button variant="primary" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Далее</Button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;