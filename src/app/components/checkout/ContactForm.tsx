import React from 'react';
import Input from './ui/Input';
import { FormData, FormErrors } from '../../types/checkoutTypes';

interface ContactFormProps {
  formData: FormData;
  errors: FormErrors;
  onChange: (field: keyof FormData, value: string | boolean) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ formData, errors, onChange }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Контактная информация</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Имя"
            required
            value={formData.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            error={errors.firstName}
            placeholder="Иван"
          />
          <Input
            label="Фамилия"
            required
            value={formData.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            error={errors.lastName}
            placeholder="Иванов"
          />
        </div>

        <Input
          label="Электронная почта"
          type="email"
          required
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          error={errors.email}
          placeholder="ivan.ivanov@example.com"
          hint="Мы отправим подтверждение заказа на эту почту"
        />

        <Input
          label="Номер телефона"
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          error={errors.phone}
          placeholder="+7 (999) 123-45-67"
          hint="Для обновлений по доставке и поддержки"
        />
      </div>
    </div>
  );
};

export default ContactForm;