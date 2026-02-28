import React from 'react';
import { ShieldCheck, Package } from 'lucide-react';
import { useOrderCarts } from '@/app/hooks/useBuy';

interface OrderSummaryProps {
  deliveryPrice: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ deliveryPrice }) => {
  const { data: orderCartsData, loading: orderCartsLoading, error: orderCartsError } = useOrderCarts();
  // Используем discount если есть, иначе cost
  const subtotal = orderCartsData?.orderCarts.reduce((sum, item) => {
    const price = item.stock?.discount ?? item.stock?.cost ?? item.cost ?? 0;
    return sum + price * (item.count ?? 0);
  }, 0) || 0;
  const tax = subtotal * 0.1;
  const total = subtotal + deliveryPrice + tax;
  if (orderCartsLoading) {
    return <div className="text-center text-gray-600 py-4">Загрузка сводки заказа...</div>;
  }
  if (orderCartsError) {
    return <div className="text-center text-red-600 py-4">Ошибка загрузки сводки заказа</div>;
  }
  return (
    <div className="bg-white rounded-xl p-6 shadow-md sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Сводка заказа</h2>
      
      <div className="space-y-3 mb-4 pb-4 border-b">
        {orderCartsData?.orderCarts.map((item) => {
          const stock = item.stock;
          const product = stock?.product;
          // Create unique key using pk fields from query
          const itemKey = `cart-${item.pk}-stock-${stock?.pk}`;
          const imgSrc = product?.photo ? `https://dataset.uz/${product.photo.imageUrl}` : "https://placehold.jp/3d4070/ffffff/150x150.png?text=No%20image";
          const altText = product?.brand?.name ?? product?.name ?? 'Товар';
          const displayName = product?.name ?? 'Товар';
          const sizeText = stock ? `${stock.size ?? ''}${stock.unit ?? ''}` : '';
          const unitPrice = stock?.discount ?? stock?.cost ?? item.cost ?? 0;
          const lineTotal = (unitPrice * (item.count ?? 0)).toFixed(2);
          return (
            <div key={itemKey} className="flex gap-3">
              <div className="bg-gray-100 rounded-lg w-16 h-16 flex items-center justify-center text-3xl flex-shrink-0">
                <img src={imgSrc} alt={altText} className="max-w-full max-h-full" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">{displayName}</h3>
                <p className="text-xs text-gray-600">{sizeText} × {item.count}</p>
                <p className="font-bold text-gray-900 text-sm">{lineTotal} ₽</p>
              </div>
            </div>
          );
        })}
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