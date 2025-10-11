'use client';

import React from 'react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  type: 'cart' | 'wishlist';
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  return (
    <div className="bg-white rounded-lg p-12 shadow-md text-center">
      <div className="text-6xl mb-4">
        {type === 'cart' ? '🛒' : '💝'}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {type === 'cart' ? 'Ваша корзина пуста' : 'Ваше избранное пустое'}
      </h2>
      <p className="text-gray-600 mb-6">
        {type === 'cart'
          ? 'Добавьте товары в корзину, чтобы начать покупки!'
          : 'Сохраняйте понравившиеся товары, чтобы вернуться к ним позже!'}
      </p>
      <Button variant="primary" size="lg" rightIcon={<ArrowRight size={20} />}>
        <Link href="/">
          Продолжить покупки
        </Link>
      </Button>
    </div>
  );
};

export default EmptyState;
