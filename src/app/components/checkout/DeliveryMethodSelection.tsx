import React from 'react';
import { DELIVERY_METHODS } from '../../data/checkoutData';

interface DeliveryMethodProps {
  selected: string;
  onChange: (id: string) => void;
}

const DeliveryMethodSelection: React.FC<DeliveryMethodProps> = ({ selected, onChange }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Способ Доставки</h2>
      
      <div className="space-y-3">
        {DELIVERY_METHODS.map((method) => (
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
                name="delivery"
                value={method.id}
                checked={selected === method.id}
                onChange={() => onChange(method.id)}
                className="w-5 h-5 text-rose-600 focus:ring-rose-500"
              />
              <div className="text-rose-600">{method.icon}</div>
              <div>
                <p className="font-semibold text-gray-900">{method.name}</p>
                <p className="text-sm text-gray-600">{method.time}</p>
              </div>
            </div>
            <span className="font-bold text-gray-900">${method.price.toFixed(2)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMethodSelection;