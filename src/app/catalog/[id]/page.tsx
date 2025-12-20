'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ProductCard from '../../components/ProductCard';
import Button from '../../components/Button';
import { Product } from '../../types/graphql';
import { useProductsCategoryPage } from '@/app/hooks/useProducts';

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

interface CategoryPageData {
  category?: {
    name: string;
    description?: string;
  };
  products?: Product[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  const [id, setId] = useState<number | null>(null);
  const {data: productsData, loading: loadingProducts, error: errorProducts, refetch} = useProductsCategoryPage(id);
  const [isLoadingParams, setIsLoadingParams] = useState(true);

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(Number(resolvedParams.id));
      setIsLoadingParams(false);
    });
  }, [params]);

  const categoryData = productsData as CategoryPageData | undefined;
  const products = categoryData?.products ?? [];


  if (errorProducts) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-rose-600">Ошибка загрузки: {errorProducts.message}</div>
        </main>
        <Footer />
      </div>
    );
  }
  if (isLoadingParams) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center text-gray-500">Загрузка...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1 text-sm font-semibold text-rose-600">
            Test
          </span>
          <div>
            {categoryData?.category && (
              <h1 className="text-4xl font-bold text-gray-900">{categoryData.category.name}</h1>
            )}
            {categoryData?.category?.description && (
            <p className="text-gray-600 mt-2">{categoryData.category.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">В коллекции</h2>
            <p className="text-sm text-gray-500">{loadingProducts ? 'Загружаем...' : `${products.length} товаров`}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => refetch()}>
              Обновить
            </Button>
            <Button variant="primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Наверх
            </Button>
          </div>
        </div>

        {loadingProducts ? (
          <div className="text-center text-gray-500">Загрузка товаров...</div>
        ) : errorProducts ? (
          <div className="text-rose-600">Ошибка загрузки товаров</div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center text-gray-500">
            В этой категории пока нет товаров.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.pk} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
