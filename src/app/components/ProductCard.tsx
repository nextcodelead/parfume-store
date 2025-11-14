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
  const displayPrice = product.discount ?? 0;
  const displayOldPrice = product.cost ?? 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 relative group">
      {/* TODO */}
      {/* {product.isNew && <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>} */}
      {showDiscount && product.discount && <span className="absolute top-2 right-8 bg-red-500 text-white text-xs px-2 py-1 rounded-full">-{product.discount}%</span>}
      
      <button onClick={() => setIsFavorite(!isFavorite)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Heart size={20} className={isFavorite ? "fill-rose-600 text-rose-600" : "text-gray-400"} />
      </button>

      <div className="text-6xl text-center my-6">{product.photo?.imageUrl}</div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
      {/* TODO */}

      <div className="flex items-center gap-1 mb-2">
        <Star size={16} className="fill-amber-400 text-amber-400" />
        {/* <span className="text-sm font-medium">{product.rating}</span> */}
        {/* <span className="text-xs text-gray-500">({product.reviews})</span> */}
      </div>

      <div className="flex items-center justify-between mb-3">
        {showDiscount && product.discount && product.cost ? (
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-rose-600">{SITE_CONFIG.currency}{displayPrice.toFixed(2)}</span>
            <span className="text-sm text-gray-500 line-through">{SITE_CONFIG.currency}{displayOldPrice?.toFixed(2)}</span>
          </div>
        ) : (
          <span className="text-xl font-bold text-gray-900">{SITE_CONFIG.currency}{displayPrice.toFixed(2)}</span>
        )}
      </div>

      <button className={`w-full ${COLORS.primary} text-white py-2 rounded-lg transition-colors`}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;