import { CartItem, DeliveryMethod, PaymentMethod } from '../types/checkoutTypes';

export const CART_ITEMS: CartItem[] = [
  { id: 1, name: 'Парфюм Velvet Rose Eau de Parfum', price: 89.99, quantity: 1, image: '🌹', size: '100 мл' },
  { id: 2, name: 'Ocean Breeze', price: 75.00, quantity: 2, image: '🌊', size: '50 мл' }
];

export const DELIVERY_METHODS: DeliveryMethod[] = [
  { 
    id: 'standard', 
    name: 'Стандартная доставка', 
    price: 5.99, 
    time: '5–7 рабочих дней',
    icon: 'truck'
  },
  { 
    id: 'express', 
    name: 'Экспресс-доставка', 
    price: 12.99, 
    time: '2–3 рабочих дня',
    icon: 'package'
  },
  { 
    id: 'overnight', 
    name: 'Доставка на следующий день', 
    price: 24.99, 
    time: 'На следующий рабочий день',
    icon: 'shieldCheck'
  }
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'card', name: 'Банковская карта', icon: '💳', description: 'Visa, Mastercard, AmEx' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️', description: 'Быстрая и безопасная оплата' },
  { id: 'apple', name: 'Apple Pay', icon: '🍎', description: 'Оплата в один клик' },
  { id: 'google', name: 'Google Pay', icon: '🔵', description: 'Быстрая оплата' },
  { id: 'cod', name: 'Наложенный платеж', icon: '💵', description: 'Оплата при получении' }
];

export const STEPS = ['Контакты', 'Доставка', 'Оплата', 'Обзор'];
