"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { CartItem } from "../components/cart/CartItem";
import { CartSummary } from "../components/cart/CartSummary";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { Trash2, ChevronRight } from "lucide-react";
import { useRemoveAllFromCart, useRemoveProductFromCart } from "../hooks/useUserCart";
import { useMeUserCart } from "../hooks/useMe";
import { Stock } from "../components/CategoriesMenu/StockSelect";
import { UserCartEntry } from "../types/graphql";

export default function CartPage() {
  const [removeAllFromCart, {loading: removeLoading, error: removeError}] = useRemoveAllFromCart();
  const [removeProductFromCart, {loading: removeProductLoading, error: removeProductError}] = useRemoveProductFromCart();
  const {loading, data, error, refetch} = useMeUserCart();
  const router = useRouter();
  const [carts, setCarts] = useState<UserCartEntry[]>([]);

  // инициализируем, когда данные придут
  useEffect(() => {
    if (data?.me?.userCart) {
      setCarts(data.me.userCart);
    }
  }, [data?.me?.userCart]);


  if (!data || loading) {
    return <div>Loading...</div>;
  }
  if( error ) {
    return <div>Error loading cart data</div>;
  }
  if (carts.length === 0) {
    return <EmptyState type="cart" />;
  }

  const handleRemove = async (pk: number) => {
    try{
      setCarts((prev) => prev.filter(item => item.pk !== pk));
      await removeProductFromCart({variables: {pk: pk}})
      await refetch();
    } catch(err) {
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
                  console.log("Update quantity for pk:", pk, "to", quantity);
                }}
                onSetStock={(stockId: number, stock: Stock)  => {
                  setCarts((prev) =>
                    prev.map(i => {
                      if (i.pk !== stockId) return i;
                      // Merge existing entry.stock with incoming stock to preserve required fields
                      // const mergedStock = { ...(i.stock as any), ...(stock as any) } as typeof i.stock;
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
