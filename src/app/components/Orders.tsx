'use client';

import React from 'react';
import { useOrders } from '../hooks/useCreateOrder';

export default function Orders() {
  const { data, loading, error } = useOrders();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        <span className="ml-3 text-gray-600">Загрузка заказов...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold mb-2">Ошибка загрузки заказов</h3>
        <p className="text-red-600 text-sm">{error.message}</p>
      </div>
    );
  }

  const orders = data?.orders || [];

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Заказов пока нет</h2>
        <p className="text-gray-600">Сделайте свой первый заказ, чтобы увидеть его здесь</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PAID':
        return 'bg-blue-100 text-blue-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Ожидает оплаты';
      case 'PAID':
        return 'Оплачен';
      case 'DELIVERED':
        return 'Доставлен';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Мои заказы</h2>
        <span className="text-gray-500">Всего заказов: {orders.length}</span>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Заказ #{order.orderNumber}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Создан: {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 text-sm rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                  <p className="text-xl font-bold text-gray-900 mt-2">
                    ₽{order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h4 className="font-medium text-gray-900 mb-3">Товары в заказе:</h4>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.product.image ? (
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-lg">🌸</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h5>
                      <p className="text-sm text-gray-600">
                        Количество: {item.quantity} × ₽{item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₽{(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>Всего товаров: {order.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
                </div>
                <div className="flex space-x-3">
                  <button className="text-pink-600 hover:text-pink-800 text-sm font-medium">
                    Подробнее
                  </button>
                  {order.status === 'DELIVERED' && (
                    <button className="text-pink-600 hover:text-pink-800 text-sm font-medium">
                      Повторить заказ
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-gray-900">Статистика заказов</h4>
              <p className="text-sm text-gray-600">
                Общая сумма всех заказов: ₽
                {orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Средний чек: ₽
                {(orders.reduce((sum, order) => sum + order.totalAmount, 0) / orders.length).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
