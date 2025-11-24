'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '../types/graphql';
import { useAddToCart } from '../hooks/useUserCart';

type ProductWithStocks = Product & {
  stocks?: {
    cost?: number;
    discount?: number;
  }[];
};

interface Props {
  product: ProductWithStocks;
  showDiscount?: boolean;
  onAddedToCart?: () => void;
}

const COLORS = {
  primary: "bg-rose-600 hover:bg-rose-700"
};

const SITE_CONFIG = {
  currency: "$"
};

const ProductCard: React.FC<Props> = ({ product, showDiscount = false, onAddedToCart }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { addToCart, loading: addingToCart } = useAddToCart();
  if (!product) return null;
  
  // Используем price как текущую цену, oldPrice только для отображения
  const displayPrice = product.stocks?.[0]?.discount ?? 0;
  const displayOldPrice = product.stocks?.[0]?.cost ?? 0;

  return (
    <div className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 group focus-within:ring-2 focus-within:ring-rose-500 h-full flex flex-col">
      <Link
        href={`/products/${product.pk}`}
        className="absolute inset-0 z-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        aria-label={`Перейти на страницу товара ${product.name}`}
      />

      <div className="relative z-20 flex flex-col h-full space-y-4">
        {showDiscount && product.discount && (
          <span className="absolute top-2 right-8 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-30">
            -{product.discount}%
          </span>
        )}
        
        <button 
          onClick={() => setIsFavorite(!isFavorite)} 
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-40"
          aria-label="Добавить в избранное"
          type="button"
        >
          <Heart 
            size={20} 
            className={isFavorite ? "fill-rose-600 text-rose-600" : "text-gray-400"} 
          />
        </button>

        {/* Обложка карточки */}
        <div className="w-full h-56 overflow-hidden rounded-md">
          <img 
            src={product.photo ? `https://dataset.uz/${product.photo.imageUrl}` : "https://placehold.jp/3d4070/ffffff/150x150.png?text=No%20image"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </div>

        <div className="space-y-2 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 min-h-[48px] flex items-start">
            {product.name}
          </h3>

          <div className="mt-auto flex items-center justify-between">
            {showDiscount && product.discount && product.cost ? (
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-rose-600">
                  {SITE_CONFIG.currency}{displayPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {SITE_CONFIG.currency}{displayOldPrice?.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                {SITE_CONFIG.currency}{displayPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        
        {!product.isInMyCart && (
        <div className="pt-2">
          <button 
            className={`relative z-40 w-full ${COLORS.primary} text-white py-2 rounded-lg transition-colors`}
            type="button" onClick={async () => { await addToCart(product.pk, 1); onAddedToCart?.(); }}
          >
            Добавить в корзину
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
