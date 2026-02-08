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
    // Явно типизируем payload для мутации
    const products: { stockId?: number | null; count: number }[] = items.map((item) => ({
      stockId: item.stock?.pk ?? null,
      count: item.count,
    }));

    try {
      const res = await beginBuy({ variables: { products } });
      const payload = res.data?.beginBuy;
      if (payload) {
        // Если сервер вернул redirectUrl — можно перенаправить туда
        if (payload.redirectUrl) {
          router.push(payload.redirectUrl);
        } else {
          // fallback: перейти на checkout
          router.push("/checkout");
        }
      } else {
        // обработка ошибки / неуспешного результата
        console.warn('Begin buy failed or returned no success flag', payload);
        alert('Не удалось начать оформление. Попробуйте ещё раз.');
      }
    } catch (err) {
      console.error('Begin buy error:', err);
      alert('Ошибка при попытке оформить заказ.');
    }
  }

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

      <Button 
        variant="primary" 
        size="lg" 
        fullWidth 
        rightIcon={<ArrowRight size={18} className="sm:w-5 sm:h-5" />}
        onClick={beginProcessBuy}
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Обработка...' : 'Перейти к оформлению заказа'}
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
