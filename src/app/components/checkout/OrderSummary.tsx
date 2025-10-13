import React from 'react';
import { ShieldCheck, Package } from 'lucide-react';
import { CART_ITEMS } from '../../data/checkoutData';

interface OrderSummaryProps {
  deliveryPrice: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ deliveryPrice }) => {
  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + deliveryPrice + tax;

  return (
    <div className="bg-white rounded-xl p-6 shadow-md sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Сводка заказа</h2>
      
      <div className="space-y-3 mb-4 pb-4 border-b">
        {CART_ITEMS.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="bg-gray-100 rounded-lg w-16 h-16 flex items-center justify-center text-3xl flex-shrink-0">
              {item.image}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
              <p className="text-xs text-gray-600">{item.size} × {item.quantity}</p>
              <p className="font-bold text-gray-900 text-sm">{(item.price * item.quantity).toFixed(2)} ₽</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-4 pb-4 border-b">
        <div className="flex justify-between text-gray-700">
          <span>Промежуточный итог</span>
          <span>{subtotal.toFixed(2)} ₽</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Доставка</span>
          <span>{deliveryPrice.toFixed(2)} ₽</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Налог (10%)</span>
          <span>{tax.toFixed(2)} ₽</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-xl font-bold text-gray-900 mb-6">
        <span>Итого</span>
        <span>{total.toFixed(2)} ₽</span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-green-600">
          <ShieldCheck size={16} />
          <span>SSL Защищённая оплата</span>
        </div>
        <div className="flex items-center gap-2 text-blue-600">
          <Package size={16} />
          <span>Бесплатный возврат в течение 30 дней</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;