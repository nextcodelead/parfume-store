import React, { useState } from 'react';
import { Search, Filter, Download, Eye, MoreVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { Order } from '../../types/admin';
import { ORDERS_DATA } from '../../data/adminData';
import Button from '../Button';

const OrdersTable: React.FC = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  // Определяем мобильное устройство
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Десктопная версия таблицы
  const DesktopTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1024px]">
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
  );

  // Мобильная версия карточек
  const MobileCards = () => (
    <div className="space-y-3 p-4">
      {ORDERS_DATA.map((order) => (
        <div key={order.id} className="bg-gray-50 rounded-lg p-4">
          {/* Заголовок карточки */}
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleOrderExpand(order.id)}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-rose-600 text-sm">{order.id}</span>
                {getStatusBadge(order.status)}
              </div>
              <p className="text-gray-900 text-sm font-medium mt-1">{order.customer}</p>
              <p className="text-gray-600 text-xs mt-1">{order.date}</p>
            </div>
            <button className="p-1">
              {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {/* Раскрывающееся содержимое */}
          {expandedOrder === order.id && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500">Товары</p>
                  <p className="text-sm font-medium">{order.items}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Сумма</p>
                  <p className="text-sm font-semibold">₽{order.total.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <button className="flex-1 flex items-center justify-center gap-1 p-2 bg-white border border-gray-300 rounded-lg text-sm">
                  <Eye size={16} />
                  <span>Просмотр</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 p-2 bg-white border border-gray-300 rounded-lg text-sm">
                  <MoreVertical size={16} />
                  <span>Еще</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Заказы</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-3">
              <Button variant="outline" size="sm" leftIcon={<Filter size={18} />} className="flex-1 sm:flex-none">
                <span className="hidden sm:inline">Фильтры</span>
                <span className="sm:hidden">Фильтр</span>
              </Button>
              <Button variant="outline" size="sm" leftIcon={<Download size={18} />} className="flex-1 sm:flex-none">
                <span className="hidden sm:inline">Экспорт</span>
                <span className="sm:hidden">Экспорт</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Поиск по номеру заказа или имени клиента..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm md:text-base"
          />
        </div>
      </div>

      {/* Table/Cards */}
      <div className="hidden md:block">
        <DesktopTable />
      </div>
      <div className="md:hidden">
        <MobileCards />
      </div>

      {/* Pagination */}
      <div className="p-4 md:p-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">Показано 1-5 из 1,234 заказов</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" size="sm" className="text-xs">Назад</Button>
            <Button variant="outline" size="sm" className="text-xs">1</Button>
            <Button variant="primary" size="sm" className="text-xs">2</Button>
            <Button variant="outline" size="sm" className="text-xs">3</Button>
            <Button variant="outline" size="sm" className="text-xs">Далее</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;