'use client';
import React, { useMemo, useState } from 'react';
import Footer from './components/layout/Footer';
import ProductCard from './components/ProductCard';
import Header from './components/layout/Header';
import { useAllProducts, useNewProducts } from './hooks/useAllProducts';
import { Product } from './types/graphql';
import { Search } from 'lucide-react';

const filterBySearch = (products: Product[], query: string): Product[] => {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name?.toLowerCase().includes(q) ||
      (p.brand as { name?: string } | undefined)?.name?.toLowerCase().includes(q)
  );
};

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading, error } = useAllProducts();
  const { data: newProductsData, loading: newLoading, error: newError, refetch: refetchNewProducts } = useNewProducts();
  const allProducts = (data as { products?: Product[] })?.products || [];
  const newArrivals = (newProductsData as { products?: Product[] })?.products || [];
  const promoProductsAll = allProducts.filter((product: Product) =>
    product.stocks?.some(
      (stock?: { discount?: number }) => (stock?.discount ?? 0) > 0
    )
  ).slice(0, 4);

  const filteredAll = useMemo(() => filterBySearch(allProducts, searchQuery), [allProducts, searchQuery]);
  const filteredNew = useMemo(() => filterBySearch(newArrivals, searchQuery), [newArrivals, searchQuery]);
  const filteredPromo = useMemo(() => filterBySearch(promoProductsAll, searchQuery), [promoProductsAll, searchQuery]);

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
      <Header searchValue={searchQuery} onSearchChange={setSearchQuery} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Поиск на мобильных (на десктопе — в шапке) */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Найти парфюм..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
            />
          </div>
        </div>

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
          ) : filteredNew.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredNew.map((product: Product) => (
                <ProductCard 
                  key={`new-${product.pk}`}
                  product={transformProductForCard(product)} 
                  onAddedToCart={() => { refetchNewProducts();  }} 
                />
              ))}
            </div>
          ) : searchQuery.trim() ? (
            <div className="text-gray-500 text-sm">По запросу «{searchQuery.trim()}» в новинках ничего не найдено</div>
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
          ) : filteredPromo.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredPromo.map((product: Product) => (
                <ProductCard
                  key={`promo-${product.pk}`}
                  product={transformProductForCard(product)}
                  showDiscount
                />
              ))}
            </div>
          ) : searchQuery.trim() ? (
            <div className="text-gray-500 text-sm">По запросу «{searchQuery.trim()}» в акциях ничего не найдено</div>
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
          ) : filteredAll.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredAll.map((product: Product) => (
                <ProductCard 
                  key={product.pk}
                  product={transformProductForCard(product)} 
                />
              ))}
            </div>
          ) : searchQuery.trim() ? (
            <div className="text-gray-500 text-sm">По запросу «{searchQuery.trim()}» ничего не найдено. Попробуйте другое название или бренд.</div>
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

