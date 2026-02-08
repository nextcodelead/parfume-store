'use client';
import React from 'react';
import Footer from './components/layout/Footer';
import ProductCard from './components/ProductCard';
import Header from './components/layout/Header';
import { useAllProducts, useNewProducts } from './hooks/useAllProducts';
import { Product } from './types/graphql';

const App: React.FC = () => {
  const { data, loading, error } = useAllProducts();
  const { data: newProductsData, loading: newLoading, error: newError, refetch: refetchNewProducts } = useNewProducts();
  const allProducts = (data as { products?: Product[] })?.products || [];
  const newArrivals = (newProductsData as { products?: Product[] })?.products || [];
  const promoProducts = allProducts
    .filter((product: Product) =>
      product.stocks?.some(
        (stock?: { discount?: number }) => (stock?.discount ?? 0) > 0
      )
    )
    .slice(0, 4);

  const transformProductForCard = (product: Product) => {
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {newArrivals.map((product: Product) => (
                <ProductCard 
                  key={`new-${product.pk}`}
                  product={transformProductForCard(product)} 
                  onAddedToCart={() => { refetchNewProducts();  }} 
                />
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {promoProducts.map((product: Product) => (
                <ProductCard
                  key={`promo-${product.pk}`}
                  product={transformProductForCard(product)}
                  showDiscount
                />
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {allProducts.map((product: Product) => (
                <ProductCard 
                  key={product.pk}
                  product={transformProductForCard(product)} 
                />
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

