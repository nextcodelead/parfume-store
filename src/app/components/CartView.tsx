'use client';

import React, { useState } from 'react';
import { useUserCart, UserCartResponse, useAddToCart } from '../hooks/useUserCart';

export default function CartView() {
  const { data, loading, error } = useUserCart();

  const [quantityUpdates, setQuantityUpdates] = useState<{[key: string]: number}>({});

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        <span className="ml-3 text-gray-600">Загрузка корзины...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold mb-2">Ошибка загрузки корзины</h3>
        <p className="text-red-600 text-sm">{error.message}</p>
      </div>
    );
  }

  const cart = (data as UserCartResponse)?.userCart;
  const items = cart?.items || [];

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Корзина пуста</h2>
        <p className="text-gray-600">Добавьте товары, чтобы увидеть их здесь</p>
      </div>
    );
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantityUpdates(prev => ({ ...prev, [itemId]: newQuantity }));
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      // Здесь должна быть мутация для обновления количества
      // await updateCartItemQuantity(itemId, quantity);
      console.log(`Updating item ${itemId} quantity to ${quantity}`);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      // Здесь должна быть мутация для удаления из корзины
      // await removeFromCart(itemId);
      console.log(`Removing item ${itemId}`);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Корзина</h2>
          <p className="text-gray-600 mt-1">
            {cart?.totalItems} товаров на сумму ${cart?.totalAmount?.toFixed(2)}
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="p-6 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  {item.product.image ? (
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-2xl">🌸</div>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {item.product.name}
                </h3>
                <p className="text-gray-600">${item.product.price}</p>
                <div className="flex items-center mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.product.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.product.inStock ? 'В наличии' : 'Нет в наличии'}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">
                    {quantityUpdates[item.id] || item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                  title="Удалить из корзины"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                Итого: ${cart?.totalAmount?.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                {cart?.totalItems} товаров
              </p>
            </div>
            <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors font-semibold">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
