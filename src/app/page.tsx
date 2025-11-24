'use client';
import React from 'react';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import Header from './components/Header';
import { useAllProducts, useNewProducts } from './hooks/useAllProducts';
import Link from "next/link";

const App: React.FC = () => {
  const { data, loading, error, refetch: refetchAllProducts } = useAllProducts();
  const { data: newProductsData, loading: newLoading, error: newError, refetch: refetchNewProducts } = useNewProducts();
  const allProducts = data?.products || [];
  const newArrivals = newProductsData?.products || [];
  const promoProducts = allProducts
    .filter((product) =>
      product.stocks?.some(
        (stock?: { discount?: number }) => (stock?.discount ?? 0) > 0
      )
    )
    .slice(0, 4);

  const transformProductForCard = (product: any) => {
    return {
      ...product,
      id: product.pk,           // id для ProductCard
      price: product.cost,      // price для ProductCard  
      image: '🍦',              // временная иконка
      rating: 4.5,
      reviews: 100,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Новинки */}
        <section id="new" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Новинки</h2>
            <span className="text-gray-500 text-sm">Первые поступления</span>
          </div>

          {newLoading ? (
            <div>Loading...</div>
          ) : newError ? (
            <div>Error loading products</div>
          ) : newArrivals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <Link
                  key={`new-${product.pk}`}
                  href={`/products/${product.pk}`}
                  className="block"
                >
                  <ProductCard product={transformProductForCard(product)} onAddedToCart={() => { refetchNewProducts();  }} />
                </Link>
              ))}
            </div>
          ) : (
            <div>Новинки появятся скоро</div>
          )}
        </section>

        {/* Акции */}
        <section id="sale" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Акции</h2>
            <span className="text-gray-500 text-sm">Лучшие предложения</span>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading products</div>
          ) : promoProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {promoProducts.map((product) => (
                <Link
                  key={`promo-${product.pk}`}
                  href={`/products/${product.pk}`}
                  className="block"
                >
                  <ProductCard
                    product={transformProductForCard(product)}
                    showDiscount
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div>Сейчас нет акций</div>
          )}
        </section>

        {/* Все товары */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Все товары</h2>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading products</div>
          ) : allProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <Link
                  key={product.pk}
                  href={`/products/${product.pk}`}
                  className="block"
                >
                  <ProductCard product={transformProductForCard(product)} />
                </Link>
              ))}
            </div>
          ) : (
            <div>No products found</div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;

