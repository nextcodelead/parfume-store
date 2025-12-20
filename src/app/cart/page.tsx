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
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-600 text-sm sm:text-base">Загрузка корзины...</div>
        </div>
      </>
    );
  }
  
  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-red-600 text-sm sm:text-base text-center">Ошибка загрузки данных корзины</div>
        </div>
      </>
    );
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Товары в корзине */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  Корзина <span className="text-gray-600 font-normal">({carts.length} {carts.length === 1 ? 'товар' : carts.length < 5 ? 'товара' : 'товаров'})</span>
                </h1>
                <button
                  onClick={async () => { await removeAllFromCart(); await refetch(); }}
                  className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 self-start sm:self-auto transition-colors"
                >
                  <Trash2 size={14} className="sm:w-4 sm:h-4" />
                  <span>Очистить корзину</span>
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
              <div className="pt-2 sm:pt-4">
                <Button
                  variant="outline"
                  leftIcon={<ChevronRight size={18} className="sm:w-5 sm:h-5 rotate-180" />}
                  onClick={() => router.push("/")}
                  className="w-full sm:w-auto"
                >
                  Продолжить покупки
                </Button>
              </div>
            </div>

            {/* Итог корзины */}
            <div className="lg:col-span-1">
              <CartSummary items={carts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}