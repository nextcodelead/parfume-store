'use client';

import React from 'react';
import Link from 'next/link';
import { useProducts } from '../hooks/useProducts';

type Stock = {
  size: string;
  quantity: number;
};

type Brand = {
  name: string;
};

type Product = {
  pk: number;
  name: string;
  photo: {
    imageUrl: string;
  } | null;
  article: string;
  cost: number;
  brand?: Brand;
  stocks?: Stock[];
};

type ProductsQueryResult = {
  products: Product[];
};

export default function ProductList() {
  const { data, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        <span className="ml-3 text-gray-600">Загрузка продуктов...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold mb-2">Ошибка загрузки продуктов</h3>
        <p className="text-red-600 text-sm">{error.message}</p>
        <details className="mt-2">
          <summary className="cursor-pointer text-sm text-red-600">Подробности ошибки</summary>
          <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </details>
      </div>
    );
  }

  const products: Product[] = (data as ProductsQueryResult | undefined)?.products ?? [];

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Продукты не найдены</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Все продукты</h2>
        <span className="text-gray-500">Найдено: {products.length}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <div 
            key={product.pk} 
            className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-pink-500"
          >
            <Link 
              href={`/products/${product.pk}`} 
              className="absolute inset-0 z-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-label={`Перейти к товару ${product.name}`}
            />
            <div className="relative z-20">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {product.photo?.imageUrl ? (
                  <img 
                    src={product.photo.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-4xl">🌸</div>
                )}
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Артикул: {product.article}</span>
                  <span className="text-lg font-bold text-pink-600">
                    {product.cost} ₽
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-900 line-clamp-2">
                  {product.name}
                </h3>
                
                {product.stocks && product.stocks.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Доступные размеры:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.stocks.map((stock, index) => (
                        <span key={index} className={`px-2 py-1 text-xs rounded-full ${
                          stock.quantity > 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {stock.size}: {stock.quantity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm text-gray-600">
                    {product.brand?.name}
                  </div>
                  <button 
                    className="relative z-30 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
                    disabled={!product.stocks?.some(stock => stock.quantity > 0)}
                    type="button"
                  >
                    {product.stocks?.some(stock => stock.quantity > 0) ? 'Добавить в  корзину' : 'Нет в наличии'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}