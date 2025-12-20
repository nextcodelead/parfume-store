'use client'

import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import WishlistItem from "../components/wishlist/WishlistItem";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import { WISHLIST_ITEMS } from "../data/wishListData";
import Link from "next/link";

const WishlistPage: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState(WISHLIST_ITEMS);

  const removeItem = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (id: number) => {
    alert(`Product ${id} added to cart!`);
  };

  if (wishlistItems.length === 0) {
    return (
      <>
        <Header activeTab="wishlist" onTabChange={() => {}} />
        <EmptyState type="wishlist" />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header activeTab="wishlist" onTabChange={() => {}} />

      <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Мои избранные товары ({wishlistItems.length} товаров)
        </h1>
        <Button variant="outline" size="sm" onClick={() => setWishlistItems([])}>
          Очистить всё
        </Button>
      </div>

      {/* Сетка избранных товаров */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlistItems.map(item => (
          <WishlistItem
            key={item.id}
            item={item}
            onRemove={removeItem}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      {/* Добавить всё в корзину */}
      <div className="mt-8 bg-gray-100 rounded-lg p-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Добавить все товары в корзину?</h3>
          <p className="text-sm text-gray-600">Сэкономьте время и добавьте всё сразу</p>
        </div>
        <Button variant="primary" leftIcon={<ShoppingBag size={20} />}>
          <Link href="/">
            Добавить всё в корзину
          </Link>
        </Button>
      </div>
    </main>


      <Footer />
    </>
  );
};

export default WishlistPage;
