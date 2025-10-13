import React from 'react';
import { CreditCard, Lock, Check } from 'lucide-react';
import { PAYMENT_METHODS } from '../../data/checkoutData';

interface PaymentMethodProps {
  selected: string;
  onChange: (id: string) => void;
}

const PaymentMethodSelection: React.FC<PaymentMethodProps> = ({ selected, onChange }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard size={24} className="text-rose-600" />
        <h2 className="text-xl font-bold text-gray-900">Способ оплаты</h2>
      </div>
      
      <div className="space-y-3">
        {PAYMENT_METHODS.map((method) => (
          <label
            key={method.id}
            className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selected === method.id
                ? 'border-rose-600 bg-rose-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selected === method.id}
                onChange={() => onChange(method.id)}
                className="w-5 h-5 text-rose-600 focus:ring-rose-500"
              />
              <div className="text-3xl">{method.icon}</div>
              <div>
                <p className="font-semibold text-gray-900">{method.name}</p>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            </div>
            {selected === method.id && (
              <Check size={24} className="text-rose-600" />
            )}
          </label>
        ))}
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-start gap-2">
        <Lock size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <p className="font-semibold mb-1">Безопасная оплата</p>
          <p>Ваша платёжная информация зашифрована и защищена. Мы никогда не храним данные вашей карты.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelection;