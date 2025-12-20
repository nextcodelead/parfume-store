"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/layout/Header";
import { CartItem } from "../components/cart/CartItem";
import { CartSummary } from "../components/cart/CartSummary";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { Trash2, ChevronRight } from "lucide-react";
import { useRemoveAllFromCart, useRemoveProductFromCart } from "../hooks/useUserCart";
import { useMeUserCart } from "../hooks/useMe";
import { Stock, UserCartEntry } from "../types/graphql";

// Создаем совместимый тип для данных с бекенда
interface BackendCartItem {
  pk: number;
  count: number;
  product: {
    pk: number;
    name: string;
    brand: { name: string };
    photo: { imageUrl: string } | null;
    stocksCount: number;
  };
  stock?: Stock;
}

export default function CartPage() {
  const [removeAllFromCart] = useRemoveAllFromCart();
  const [removeProductFromCart] = useRemoveProductFromCart();
  const { loading, data, error, refetch } = useMeUserCart();
  const router = useRouter();
  const [carts, setCarts] = useState<UserCartEntry[]>([]);

  // Преобразуем данные при получении
  useEffect(() => {
    if (data?.me?.userCart) {
      const backendData = data.me.userCart as unknown as BackendCartItem[];
      
      const transformedCarts: UserCartEntry[] = backendData.map(item => ({
        ...item,
        product: {
          ...item.product,
          stocksCount: item.product.stocksCount
        }
      }));
      
      setCarts(transformedCarts);
    }
  }, [data?.me?.userCart]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error loading cart data</div>;
  }
  
  if (carts.length === 0) {
    return <EmptyState type="cart" />;
  }

  const handleRemove = async (pk: number) => {
    try {
      setCarts((prev) => prev.filter(item => item.pk !== pk));
      await removeProductFromCart({ variables: { pk } });
      await refetch();
    } catch (err) {
      console.error("Failed to remove product from cart:", err);
    }
  }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Товары в корзине */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Корзина ({carts.length} товаров)
            </h1>
            <button
              onClick={async () => { await removeAllFromCart(); await refetch(); }}
              className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-1"
            >
              <Trash2 size={16} />
              Очистить корзину
            </button>
          </div>

          {carts.map((item) => (
            <CartItem
              key={item.pk}
              cart={item}
              onUpdateQuantity={(pk, quantity) => {
                setCarts((prev) =>
                  prev.map(i => i.pk === pk ? { ...i, count: quantity } : i)
                );
              }}
              onSetStock={(stockId: number, stock: Stock) => {
                setCarts((prev) =>
                  prev.map(i => {
                    if (i.pk !== stockId) return i;
                    const existingStock = i.stock ?? {} as Stock;
                    const mergedStock: Stock = { 
                      ...existingStock, 
                      ...stock,
                      article: stock.article || existingStock?.article || '',
                      volume: stock.volume ?? existingStock?.volume ?? 0
                    };
                    return { ...i, stock: mergedStock };
                  })
                );
              }}
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
          <CartSummary items={carts} />
        </div>
      </div>
    </>
  );
}