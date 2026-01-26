'use client';
import React from "react";
import { X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Button from "../Button";
import { WishlistItem as WishlistItemType } from "../../hooks/useWishlist";

interface WishlistItemProps {
  item: WishlistItemType;
  onRemove: (wishlistItemPk: number) => void;
  onAddToCart: (productId: number) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ item, onRemove, onAddToCart }) => {
  const product = item.product;
  const firstStock = product.stocks?.[0];
  const price = firstStock?.discount ?? firstStock?.cost ?? 0;
  const oldPrice = firstStock?.cost && firstStock?.discount ? firstStock.cost : null;
  const discount = firstStock?.cost && firstStock?.discount 
    ? Math.round((1 - firstStock.discount / firstStock.cost) * 100) 
    : 0;
  const inStock = firstStock?.quantity ? firstStock.quantity > 0 : false;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        {/* Кнопка удаления */}
        <button
          onClick={() => onRemove(item.pk)}
          className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition-colors z-10"
          aria-label="Удалить из избранного"
        >
          <X size={16} className="text-gray-600 hover:text-red-600" />
        </button>

        {/* Значок скидки */}
        {discount > 0 && (
          <span className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-br-lg rounded-tl-lg font-semibold">
            -{discount}%
          </span>
        )}

        {/* Картинка товара */}
        <Link href={`/products/${product.pk}`}>
          <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden mb-4">
            {product.photo?.imageUrl ? (
              <img 
                src={`https://dataset.uz/${product.photo.imageUrl}`} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl">🌹</span>
            )}
          </div>
        </Link>
      </div>

      {/* Информация о товаре */}
      <div className="space-y-2">
        <p className="text-xs text-gray-600">{product.brand?.name}</p>
        <Link href={`/products/${product.pk}`}>
          <h3 className="font-semibold text-gray-900 hover:text-rose-600 transition-colors">{product.name}</h3>
        </Link>

        {/* Цена */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">₽{price.toFixed(2)}</span>
          {oldPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₽{oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Наличие */}
        {!inStock ? (
          <p className="text-red-600 text-sm font-semibold">Нет в наличии</p>
        ) : (
          <p className="text-green-600 text-sm font-semibold">В наличии</p>
        )}

        {/* Кнопка действия */}
        <Button
          size="sm"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => onAddToCart(product.pk)}
          disabled={!inStock}
        >
          <ShoppingCart size={16} />
          {inStock ? "Добавить в корзину" : "Нет в наличии"}
        </Button>
      </div>
    </div>
  );
};

export default WishlistItem;
