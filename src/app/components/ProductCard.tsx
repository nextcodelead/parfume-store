'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '../types/graphql';
import { useAddToCart } from '../hooks/useUserCart';
import { useWishlist } from '../hooks/useWishlist';

type ProductWithStocks = Product & {
  stocks?: {
    cost?: number;
    discount?: number;
  }[];
  isInMyCart?: boolean;
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
  currency: "₽"
};

const ProductCard: React.FC<Props> = ({ product, showDiscount = false, onAddedToCart }) => {
  const { addToCart, loading: addingToCart } = useAddToCart();
  const { isInWishlist, addProduct, removeProductById } = useWishlist();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(isInWishlist(product.pk));
  }, [isInWishlist, product.pk]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (isFavorite) {
        await removeProductById(product.pk);
      } else {
        await addProduct(product.pk);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Ошибка при обновлении избранного:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(product.pk, 1);
    onAddedToCart?.();
  };

  if (!product) return null;

  const displayPrice = product.stocks?.[0]?.discount ?? 0;
  const displayOldPrice = product.stocks?.[0]?.cost ?? 0;

  return (
    <Link
      href={`/products/${product.pk}`}
      className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow md:p-4 group focus-within:ring-2 focus-within:ring-rose-500 h-full flex flex-col cursor-pointer"
      aria-label={`Перейти на страницу товара ${product.name}`}
    >
      <div className="relative flex flex-col h-full space-y-3">
        {showDiscount && product.discount && (
          <span className="absolute top-2 right-8 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-30">
            -{product.discount}%
          </span>
        )}
        
        <button 
          onClick={handleToggleFavorite}
          disabled={isLoading}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-40 disabled:opacity-50"
          aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
          type="button"
        >
          <Heart 
            size={20} 
            className={isFavorite ? "fill-rose-600 text-rose-600" : "text-gray-400"} 
          />
        </button>

        {/* Обложка карточки */}
        <div className="w-full h-36 sm:h-44 md:h-56 overflow-hidden rounded-md">
          <img 
            src={product.photo ? `https://dataset.uz/${product.photo.imageUrl}` : "https://placehold.jp/3d4070/ffffff/150x150.png?text=No%20image"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </div>

        <div className="px-2 space-y-2 flex-1 flex flex-col">
          <h3 className="text-sm md:text-lg font-semibold text-gray-900  flex items-start">
            {product.name}
          </h3>

          <div className="mt-auto flex items-center justify-between">
            {showDiscount && product.discount && product.cost ? (
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl font-bold text-rose-600">
                  {SITE_CONFIG.currency }{displayPrice.toFixed(2)}
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  {SITE_CONFIG.currency }{displayOldPrice?.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg md:text-xl font-bold text-gray-900">
                {SITE_CONFIG.currency }{Number(displayPrice).toFixed(2)}
              </span>
            )}
          </div>
        </div>
        
        {!product.isInMyCart && (
        <div className="px-2 py-2">
          <button 
            className={`relative z-40 w-full ${COLORS.primary} text-white py-2 text-sm md:text-base rounded-lg transition-colors`}
            type="button" 
            onClick={handleAddToCart}
          >
            Добавить в корзину
          </button>
        </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
