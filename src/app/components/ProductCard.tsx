'use client'
import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { Product } from '../types/graphql';

interface Props {
  product: Product;
  showDiscount?: boolean;
}

const COLORS = {
  primary: "bg-rose-600 hover:bg-rose-700"
};

const SITE_CONFIG = {
  currency: "$"
};

const ProductCard: React.FC<Props> = ({ product, showDiscount = false }) => {
  if (!product) return null;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  
  // Используем price как текущую цену, oldPrice только для отображения
  const displayPrice = product.stocks[0]?.discount ?? 0;
  const displayOldPrice = product.stocks[0]?.cost ?? 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 relative group">

      {/* Обложка карточки */}
      <div className="w-full h-56 overflow-hidden rounded-md mb-4">
        <img 
          src={product.photo ? `https://dataset.uz/${product.photo.imageUrl}` : "https://placehold.jp/3d4070/ffffff/150x150.png?text=No%20image"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
      </div>

      {showDiscount && product.discount && (
        <span className="absolute top-2 right-8 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          -{product.discount}%
        </span>
      )}
      
      <button 
        onClick={() => setIsFavorite(!isFavorite)} 
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart 
          size={20} 
          className={isFavorite ? "fill-rose-600 text-rose-600" : "text-gray-400"} 
        />
      </button>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>

      <div className="flex items-center justify-between mb-3">
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

      <button className={`w-full ${COLORS.primary} text-white py-2 rounded-lg transition-colors`}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
