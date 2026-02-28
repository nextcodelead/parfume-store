"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Package, Gift, ArrowRight } from "lucide-react";
import  Button  from "../Button";
import { SHIPPING_OPTIONS } from "../../data/shippingOptions";
import { useBeginBuy } from "@/app/hooks/useBuy";
import { UserCartEntry } from "@/app/types/graphql";
import type { Stock } from "@/app/types/graphql";


type CartSummaryProps = {
  items: Array<UserCartEntry & { stock?: Stock }>;
};

export const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [discount] = useState(0);
  const [beginBuy, {loading}] = useBeginBuy();
  

  // Используем discount если есть, иначе cost
  const subtotal = items.reduce((sum, item) => {
    const price = item.stock ? (item.stock.discount ?? item.stock.cost) : 0;
    return sum + price * item.count;
  }, 0);
  const shipping = SHIPPING_OPTIONS.find((s) => s.id === selectedShipping)?.price || 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax - discount;
  const router = useRouter();

  const beginProcessBuy = async () => {
    const products: { stockId?: number | null; count: number }[] = items.map((item) => ({
      stockId: item.stock?.pk ?? null,
      count: item.count,
    }));

    const itemsWithoutStock = items.filter((item) => !item.stock?.pk);
    if (itemsWithoutStock.length > 0) {
      alert(
        'Для всех товаров нужно выбрать объём. Выберите вариант в каждом товаре (например 50 ml, 100 ml).'
      );
      return;
    }

    try {
      // Сохраняем товары в sessionStorage перед оформлением на случай возврата
      // Удаляем дубли по комбинации product.pk + stock.pk
      if (typeof window !== 'undefined') {
        const deduplicatedItems = items.reduce((unique: typeof items, item) => {
          const isDuplicate = unique.some(
            u => u.product?.pk === item.product?.pk && u.stock?.pk === item.stock?.pk
          );
          if (!isDuplicate) {
            unique.push(item);
          }
          return unique;
        }, []);
        
        console.log(`Сохраняю резервную копию: ${items.length} товаров, после дедупликации: ${deduplicatedItems.length}`);
        sessionStorage.setItem('cartBackup', JSON.stringify(deduplicatedItems));
      }

      const res = await beginBuy({ variables: { products } });
      const raw = res.data?.beginBuy;
      const gqlErrors = 'errors' in res ? (res as { errors?: { message?: string }[] }).errors : undefined;

      if (gqlErrors?.length) {
        const msg = gqlErrors[0]?.message ?? 'Ошибка сервера';
        alert(msg);
        return;
      }

      if (raw != null && raw !== false) {
        if (typeof raw === 'string') {
          // Очищаем флаги при успешном переходе на оплату
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem('cartBackup');
          }
          router.push(raw);
          return;
        }
        const payload = raw as { success?: boolean; redirectUrl?: string; orderId?: number };
        if (payload?.redirectUrl) {
          // Очищаем флаги при успешном переходе на оплату
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem('cartBackup');
          }
          router.push(payload.redirectUrl);
          return;
        }
      }

      // Очищаем флаги при переходе в оформление
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('cartBackup');
      }
      router.push("/checkout");
    } catch (err) {
      console.error('Begin buy error:', err);
      const message = err instanceof Error ? err.message : 'Ошибка при попытке оформить заказ.';
      alert(message);
    }
  };

  const allHaveStockSelected = items.every((item) => item.stock?.pk != null);

  return (
    <div className="bg-white rounded-lg p-4 sm:p-5 lg:p-6 shadow-md lg:sticky lg:top-24">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5">Итог заказа</h2>

      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5 pb-4 sm:pb-5 border-b">
        <div className="flex justify-between text-sm sm:text-base text-gray-700">
          <span>Сумма ({items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров'})</span>
          <span className="font-semibold">₽{subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">📦 Доставка</label>
          <div className="space-y-1.5 sm:space-y-2">
            {SHIPPING_OPTIONS.map((option) => (
              <label 
                key={option.id} 
                className="flex items-center justify-between p-2 sm:p-2.5 hover:bg-gray-50 rounded cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={selectedShipping === option.id}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                    className="text-rose-600 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium truncate">{option.name}</p>
                    <p className="text-xs text-gray-600">{option.days}</p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-semibold flex-shrink-0 ml-2">₽{option.price.toFixed(2)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between text-sm sm:text-base text-gray-700">
          <span>Налог (10%)</span>
          <span className="font-semibold">₽{tax.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm sm:text-base text-green-600">
            <span>Скидка</span>
            <span className="font-semibold">-₽{discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
        <span>Итого</span>
        <span>₽{total.toFixed(2)}</span>
      </div>

      {!allHaveStockSelected && items.some((i) => i.product.stocksCount > 0) && (
        <p className="text-amber-700 text-sm mb-3">
          Выберите объём для каждого товара (в блоке товара выше), затем нажмите кнопку ниже.
        </p>
      )}
      <Button 
        variant="primary" 
        size="lg" 
        fullWidth 
        rightIcon={<ArrowRight size={18} className="sm:w-5 sm:h-5" />}
        onClick={beginProcessBuy}
        disabled={loading || !allHaveStockSelected}
        className="w-full"
      >
        {loading ? 'Обработка...' : allHaveStockSelected ? 'Перейти к оформлению заказа' : 'Выберите объём для всех товаров'}
      </Button>

      <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <Package size={14} className="text-green-600 flex-shrink-0 mt-0.5 sm:w-4 sm:h-4" />
          <span>Бесплатный возврат в течение 30 дней</span>
        </div>
        <div className="flex items-start gap-2">
          <Gift size={14} className="text-purple-600 flex-shrink-0 mt-0.5 sm:w-4 sm:h-4" />
          <span>Доступна бесплатная подарочная упаковка</span>
        </div>
      </div>
    </div>
  );
};
