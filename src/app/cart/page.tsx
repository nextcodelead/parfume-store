"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { CartItem } from "../components/cart/CartItem";
import { CartSummary } from "../components/cart/CartSummary";
import { CART_ITEMS } from "../data/cartProductsData";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { Trash2, ChevronRight } from "lucide-react";

export default function CartPage() {
  const [items, setItems] = useState(CART_ITEMS);
  const router = useRouter();

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (items.length === 0) {
    return <EmptyState type="cart" />;
  }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Товары в корзине */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Корзина ({items.length} товаров)
            </h1>
            <button
              onClick={() => setItems([])}
              className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-1"
            >
              <Trash2 size={16} />
              Очистить корзину
            </button>
          </div>

          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          ))}

          {/* Продолжить покупки */}
          <Button
            variant="outline"
            leftIcon={<ChevronRight size={20} className="rotate-180" />}
            onClick={() => router.push("/")}
          >
            Продолжить покупки
          </Button>
        </div>

        {/* Итог корзины */}
        <div className="md:col-span-1">
          <CartSummary items={items} />
        </div>
      </div>
    </>
  );
}
