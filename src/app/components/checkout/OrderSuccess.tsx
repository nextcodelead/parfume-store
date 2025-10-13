import React from 'react';
import { Check } from 'lucide-react';
import Button from '../Button';

interface OrderSuccessProps {
  email: string;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ email }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-8 shadow-xl text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={40} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Заказ принят!</h1>
        <p className="text-gray-600 mb-6">
          Спасибо за вашу покупку. Мы отправили подтверждение на вашу почту <strong>{email}</strong>
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Номер заказа</p>
          <p className="text-2xl font-bold text-gray-900">#ES-{Math.floor(Math.random() * 100000)}</p>
        </div>
        <Button variant="primary" size="lg" fullWidth>
          Отследить заказ
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccess;