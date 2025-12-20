'use client';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useNewProducts } from '../hooks/useAllProducts';
import { Product } from '../types/graphql';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';

export default function NewProductsPage(): React.FC {
  const { data, loading, error } = useNewProducts();
  const newProducts = (data as { products?: Product[] })?.products || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Новинки</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product: Product) => (
            <ProductCard key={product.pk} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}