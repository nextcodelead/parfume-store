'use client';

import React from 'react';
import { useQuery } from '@apollo/client/react';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import Button from '../../components/Button';
import { GET_PRODUCTS } from '../../graphql/queries';
import { useIsClient } from '../../hooks/useIsClient';
import { Product, ProductsResponse } from '../../types/graphql';

const CATEGORY_MAP = {
  men: {
    title: 'Мужские ароматы',
    description: 'Брутальные композиции для уверенных мужчин.',
    badge: 'MEN',
    filters: {
      sex: { equals: 'MALE' },
    },
  },
  women: {
    title: 'Женские ароматы',
    description: 'Нежные и элегантные парфюмы на каждый день и особые случаи.',
    badge: 'WOMEN',
    filters: {
      sex: { equals: 'FEMALE' },
    },
  },
  unisex: {
    title: 'Унисекс коллекция',
    description: 'Современные композиции без границ и правил.',
    badge: 'UNISEX',
    filters: {
      sex: { equals: 'GENERAL' },
    },
  },
} as const;

type CategoryKey = keyof typeof CATEGORY_MAP;

interface CategoryPageProps {
  params: { slug: string };
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  const categoryKey = params.slug?.toLowerCase() as CategoryKey;
  const config = CATEGORY_MAP[categoryKey];

  if (!config) {
    notFound();
  }

  const isClient = useIsClient();
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS, {
    variables: {
      filters: {
        isPublished: { equals: true },
        ...config.filters,
      },
      pagination: { limit: 40 },
    },
    skip: !isClient,
  });

  const products = (data as ProductsResponse | undefined)?.products ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1 text-sm font-semibold text-rose-600">
            {config.badge}
          </span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{config.title}</h1>
            <p className="text-gray-600 mt-2">{config.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">В коллекции</h2>
            <p className="text-sm text-gray-500">{loading ? 'Загружаем...' : `${products.length} товаров`}</p>
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

        {loading ? (
          <div className="text-center text-gray-500">Загрузка товаров...</div>
        ) : error ? (
          <div className="text-rose-600">Ошибка загрузки: {error.message}</div>
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
