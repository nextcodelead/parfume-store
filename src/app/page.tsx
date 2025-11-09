'use client';
import React from 'react';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import Header from './components/Header';
import { useProductsByDiscount } from './hooks/useCategories';
import { Product } from './types/graphql';
import { useAllProducts } from './hooks/useAllProducts';

const App: React.FC = () => {
  const { data, loading, error } = useAllProducts();
  const allProducts = data?.products || [];

  // ДОБАВЬТЕ ЭТУ ФУНКЦИЮ
  const transformProductForCard = (product: any) => {
    return {
      ...product,
      id: product.pk,           // ProductCard ожидает id
      price: product.cost,      // ProductCard ожидает price  
      image: '🍦',              // временная иконка
      rating: 4.5,              // заглушка
      reviews: 100,             // заглушка
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Все товары для тестирования */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Все товары</h2>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading products</div>
          ) : allProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.map(product => (
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

        {/* Остальные секции... */}
      </main>
    </div>
  );
};

export default App;