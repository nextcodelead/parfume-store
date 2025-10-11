'use client';
import React from "react";
import { X, ShoppingCart } from "lucide-react";
import  Button  from "../Button";
import { WISHLIST_ITEMS } from "../../data/wishListData";

interface WishlistItemProps {
  item: typeof WISHLIST_ITEMS[number]; // тип одного элемента массива
  onRemove: (id: number) => void;
  onAddToCart: (id: number) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ item, onRemove, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        {/* Кнопка удаления */}
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition-colors z-10"
        >
          <X size={16} className="text-gray-600 hover:text-red-600" />
        </button>

        {/* Значок скидки */}
        {item.discount && (
          <span className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-br-lg rounded-tl-lg font-semibold">
            -{item.discount}%
          </span>
        )}

        {/* Картинка товара */}
        <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center text-6xl mb-4">
          {item.image}
        </div>
      </div>

      {/* Информация о товаре */}
      <div className="space-y-2">
        <p className="text-xs text-gray-600">{item.brand}</p>
        <h3 className="font-semibold text-gray-900">{item.name}</h3>

        {/* Цена */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
          {item.oldPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${item.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Наличие */}
        {!item.inStock ? (
          <p className="text-red-600 text-sm font-semibold">Нет в наличии</p>
        ) : (
          <p className="text-green-600 text-sm font-semibold">В наличии</p>
        )}


        {/* Кнопка действия */}
        <Button
          // variant={item.inStock ? "default" : "outline"}
          size="sm"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => onAddToCart(item.id)}
          disabled={!item.inStock}
        >
          <ShoppingCart size={16} />
          {item.inStock ? "Add to Cart" : "Notify Me"}
        </Button>
      </div>
    </div>
  );
};

export default WishlistItem;
