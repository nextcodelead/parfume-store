export type ShippingOption = {
  id: string;
  name: string;
  days: string;
  price: number;
};

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: 'standard', name: 'Стандартная доставка', price: 5.99, days: '5–7 рабочих дней' },
  { id: 'express', name: 'Экспресс-доставка', price: 12.99, days: '2–3 рабочих дня' },
  { id: 'overnight', name: 'Доставка за 1 день', price: 24.99, days: '1 рабочий день' },
];

