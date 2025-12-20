'use client';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useSaleProducts } from '../hooks/useAllProducts';
import { Product } from '../types/graphql';
import ProductCard from '../components/ProductCard';

export default function SalePage() {
  const { data, loading, error } = useSaleProducts();
  const allProducts = (data as { products?: Product[] })?.products || [];
  const saleProducts = allProducts.filter((product: Product) =>
    product.stocks?.some((stock?: { discount?: number }) => (stock?.discount ?? 0) > 0)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Акции</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.map((product: Product) => (
            <ProductCard key={product.pk} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}