import React from 'react';
import { MapPin } from 'lucide-react';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import { FormData, FormErrors } from '../../types/checkoutTypes';

interface DeliveryAddressFormProps {
  formData: FormData;
  errors: FormErrors;
  onChange: (field: keyof FormData, value: string | boolean) => void;
}

const DeliveryAddressForm: React.FC<DeliveryAddressFormProps> = ({ formData, errors, onChange }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={24} className="text-rose-600" />
        <h2 className="text-xl font-bold text-gray-900">Адрес Доставки</h2>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Страна"
            required
            value={formData.country}
            onChange={(e) => onChange('country', e.target.value)}
            error={errors.country}
            placeholder="Россия"
          />
          <Input
            label="Город"
            required
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
            error={errors.city}
            placeholder="Москва"
          />
        </div>

        <Input
          label="Адрес"
          required
          value={formData.address}
          onChange={(e) => onChange('address', e.target.value)}
          error={errors.address}
          placeholder="ул. Ленина, д. 10"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Квартира / Офис"
            value={formData.apartment}
            onChange={(e) => onChange('apartment', e.target.value)}
            placeholder="Кв. 15 (необязательно)"
          />
          <Input
            label="Почтовый индекс"
            required
            value={formData.zipCode}
            onChange={(e) => onChange('zipCode', e.target.value)}
            error={errors.zipCode}
            placeholder="101000"
          />
        </div>

        <Textarea
          label="Примечания к доставке"
          value={formData.deliveryNote}
          onChange={(e) => onChange('deliveryNote', e.target.value)}
          placeholder="Любые особые указания для доставки..."
          rows={3}
          hint="Необязательно: Оставить у двери, позвонить по прибытии и т.д."
        />

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.saveAddress}
            onChange={(e) => onChange('saveAddress', e.target.checked)}
            className="w-5 h-5 text-rose-600 border-gray-300 rounded focus:ring-2 focus:ring-rose-500"
          />
          {/* <span className="text-sm text-gray-700">Сохранить адресс для будущих заказов</span> */}
        </label>
      </div>
    </div>
  );
};

export default DeliveryAddressForm;