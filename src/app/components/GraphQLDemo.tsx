'use client';

import React, { useState } from 'react';
import ProductList from './ProductList';
import CartView from './CartView';
import Profile from './Profile';
import Orders from './Orders';
import { useCategories, useBrands } from '../hooks/useCategories';
import { CategoriesResponse, BrandsResponse } from '../types/graphql';

type TabType = 'products' | 'cart' | 'profile' | 'orders';

export default function GraphQLDemo() {
  const [activeTab, setActiveTab] = useState<TabType>('products');
  const { data: categoriesData, loading: categoriesLoading } = useCategories();
  const { data: brandsData, loading: brandsLoading } = useBrands();

  const tabs = [
    { id: 'products' as TabType, label: 'Продукты', icon: '🛍️' },
    { id: 'cart' as TabType, label: 'Корзина', icon: '🛒' },
    { id: 'profile' as TabType, label: 'Профиль', icon: '👤' },
    { id: 'orders' as TabType, label: 'Заказы', icon: '📦' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductList />;
      case 'cart':
        return <CartView />;
      case 'profile':
        return <Profile />;
      case 'orders':
        return <Orders />;
      default:
        return <ProductList />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          GraphQL Demo - Парфюмерный магазин
        </h1>
        <p className="text-gray-600">
          Демонстрация интеграции GraphQL с Apollo Client
        </p>
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">
            <strong>✅ GraphQL подключен к:</strong> https://dataset.uz/graphql
          </p>
          <p className="text-green-700 text-sm mt-1">
            Все компоненты готовы для работы с реальными данными
          </p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold text-gray-900 mb-2">Категории</h4>
              {categoriesLoading ? (
                <p className="text-sm text-gray-500">Загрузка...</p>
              ) : (
                <p className="text-sm text-gray-600">
                  Найдено: {(categoriesData as CategoriesResponse)?.categories?.length || 0} категорий
                </p>
              )}
            </div>
            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold text-gray-900 mb-2">Бренды</h4>
              {brandsLoading ? (
                <p className="text-sm text-gray-500">Загрузка...</p>
              ) : (
                <p className="text-sm text-gray-600">
                  Найдено: {(brandsData as BrandsResponse)?.brands?.length || 0} брендов
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Табы */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Контент */}
      <div className="min-h-[400px]">
        {renderContent()}
      </div>

      {/* Информация о GraphQL */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Информация о GraphQL интеграции
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Структура файлов:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>📁 src/app/graphql/</li>
              <li>  ├── queries.ts (запросы)</li>
              <li>  ├── mutations.ts (мутации)</li>
              <li>  └── enums.ts (константы)</li>
              <li>📁 src/app/hooks/</li>
              <li>  ├── useProducts.ts</li>
              <li>  ├── useCategories.ts</li>
              <li>  ├── useUserCart.ts</li>
              <li>  ├── useCreateOrder.ts</li>
              <li>  └── useUpdateUser.ts</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Готовые запросы (обновлены под реальную схему):</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• brands (name)</li>
              <li>• categories (uid, name)</li>
              <li>• products (article, name, images, stocks, fragranceNotes)</li>
              <li>• me, orders, userCart, userCartItem</li>
            </ul>
            <h4 className="font-medium text-gray-900 mb-2 mt-4">Готовые мутации:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• addProductToUserCart</li>
              <li>• createOrder</li>
              <li>• updateMe, updateUser</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
