import React from 'react';
import { Info } from 'lucide-react';
import { FormData } from '../../types/checkoutTypes';
import { DELIVERY_METHODS, PAYMENT_METHODS } from '../../data/checkoutData';

interface ReviewOrderProps {
  formData: FormData;
  deliveryMethod: string;
  paymentMethod: string;
  deliveryPrice: number;
}

const ReviewOrder: React.FC<ReviewOrderProps> = ({
  formData,
  deliveryMethod,
  paymentMethod,
  deliveryPrice
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Проверьте ваш заказ</h2>
      
      <div className="space-y-4">
        <div className="pb-4 border-b">
          <h3 className="font-semibold text-gray-900 mb-2">Контактная информация</h3>
          <p className="text-gray-700">{formData.firstName} {formData.lastName}</p>
          <p className="text-gray-700">{formData.email}</p>
          <p className="text-gray-700">{formData.phone}</p>
        </div>

        <div className="pb-4 border-b">
          <h3 className="font-semibold text-gray-900 mb-2">Адрес доставки</h3>
          <p className="text-gray-700">{formData.address}</p>
          {formData.apartment && <p className="text-gray-700">{formData.apartment}</p>}
          <p className="text-gray-700">{formData.city}, {formData.zipCode}</p>
          <p className="text-gray-700">{formData.country}</p>
        </div>

        <div className="pb-4 border-b">
          <h3 className="font-semibold text-gray-900 mb-2">Способ доставки</h3>
          <p className="text-gray-700">
            {DELIVERY_METHODS.find(m => m.id === deliveryMethod)?.name} - {deliveryPrice.toFixed(2)} ₽
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Способ оплаты</h3>
          <p className="text-gray-700">
            {PAYMENT_METHODS.find(m => m.id === paymentMethod)?.name}
          </p>
        </div>
      </div>

      <div className="p-4 bg-amber-50 rounded-lg flex items-start gap-2">
        <Info size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-900">
          Размещая этот заказ, вы соглашаетесь с нашими Условиями использования и Политикой конфиденциальности.
        </p>
      </div>
    </div>
  );
};

export default ReviewOrder;