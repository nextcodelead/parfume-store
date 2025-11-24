import { useState } from "react";
import { Tag, Package, Gift, ArrowRight } from "lucide-react";
import  Button  from "../Button";
import { SHIPPING_OPTIONS } from "../../data/shippingOptions";
import { CartItemType } from "../../data/cartProductsData";
import Link from "next/link";
type CartSummaryProps = {
  items: [];
};

export const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
  const [promoCode, setPromoCode] = useState("");
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [discount, setDiscount] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + (item.stock?.cost ?? 0) * item.count, 0);
  const shipping = SHIPPING_OPTIONS.find((s) => s.id === selectedShipping)?.price || 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax - discount;

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(subtotal * 0.1);
    } else {
      alert("Invalid promo code");
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Итог заказа</h2>

      <div className="space-y-3 mb-4 pb-4 border-b">
        <div className="flex justify-between text-gray-700">
          <span>Сумма ({items.length} без доставки)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">📦 Доставка</label>
          {SHIPPING_OPTIONS.map((option) => (
            <label key={option.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="shipping"
                  value={option.id}
                  checked={selectedShipping === option.id}
                  onChange={(e) => setSelectedShipping(e.target.value)}
                  className="text-rose-600"
                />
                <div>
                  <p className="text-sm font-medium">{option.name}</p>
                  <p className="text-xs text-gray-600">{option.days}</p>
                </div>
              </div>
              <span className="text-sm font-semibold">${option.price.toFixed(2)}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Налог (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Скидка</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Promo */}
      {/* <div className="mb-4 pb-4 border-b">
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Promo code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <Button variant="outline" size="sm" onClick={applyPromoCode}>
            Применить
          </Button>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          <Tag size={12} className="inline" /> Попробуйте промокод: SAVE10
        </p>
      </div> */}

      <div className="flex justify-between items-center text-xl font-bold text-gray-900 mb-6">
        <span>Итого</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight size={20} />}>
      <Link href="/checkout" className="flex items-center justify-center w-full">
        Перейти к оформлению заказа
      </Link>
      </Button>

      <div className="mt-6 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Package size={16} className="text-green-600" />
          <span>Бесплатный возврат в течение 30 дней</span>
        </div>
        <div className="flex items-center gap-2">
          <Gift size={16} className="text-purple-600" />
          <span>Доступна бесплатная подарочная упаковка</span>
        </div>
      </div>
    </div>
  );
};
