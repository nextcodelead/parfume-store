import { Minus, Plus, X, AlertCircle } from "lucide-react";
import StockSelect from "../CategoriesMenu/StockSelect";
import type { Stock } from "@/app/types/graphql";

import { useEffect, useState } from "react";
import { UserCartEntry } from "@/app/types/graphql";

type CartItemProps = {
  cart: UserCartEntry;
  onSetStock: (pk: number, stock: Stock) => void;
  onUpdateQuantity: (pk: number, quantity: number) => void;
  onRemove: (pk: number) => void;
};

export const CartItem: React.FC<CartItemProps> = ({ cart, onSetStock, onUpdateQuantity, onRemove }) => {

  // const subtotal = item.price * item.quantity;
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [haveInStock, setHaveInStock] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    setHaveInStock(
      cart.product.stocksCount > 0 &&
      (selectedStock?.quantity ?? 0) > 0
    );
  }, [cart.product.stocksCount, selectedStock]);

  useEffect(() => {
    if (selectedStock) {
      setSubtotal(selectedStock.cost * quantity);
    } else {
      setSubtotal(0);
    }
  }, [selectedStock, quantity]);

  return (
    <div className={`bg-white rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-3 sm:gap-4 ${!haveInStock ? "opacity-60" : ""}`}>
      {/* Image */}
      <div className="bg-gray-100 rounded-lg w-full sm:w-20 md:w-24 h-32 sm:h-20 md:h-24 flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img 
          src={cart.product.photo ? `https://dataset.uz/${cart.product.photo.imageUrl}` : "https://placehold.jp/3d4070/ffffff/150x150.png?text=No%20image"} 
          alt={cart.product.brand.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">{cart.product.brand.name}</p>
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2">{cart.product.name}</h3>
          </div>
          <button
            onClick={() => onRemove(cart.pk)}
            className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0 p-1"
            aria-label="Удалить товар"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {!haveInStock && (
          <div className="flex items-center gap-1.5 text-red-600 text-xs sm:text-sm mb-2 sm:mb-3">
            <AlertCircle size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
            <span>Нет в наличии</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mt-auto">
          {/* Stock Select */}
          {cart.product.stocksCount > 0 && (
            <div className="flex-shrink-0 sm:min-w-[140px]">
              <StockSelect 
                productId={cart.product.pk} 
                onChange={(value) => {
                  setSelectedStock(value); 
                  onSetStock(cart.pk, value);
                }} 
              />
            </div>
          )}
          
          {/* Quantity */}
          <div className="flex items-center border border-gray-300 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => { 
                const newQty = Math.max(1, quantity - 1);
                onUpdateQuantity(cart.pk, newQty); 
                setQuantity(newQty); 
              }}
              className="p-1.5 sm:p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!haveInStock || quantity <= 1}
              aria-label="Уменьшить количество"
            >
              <Minus size={14} className="sm:w-4 sm:h-4" />
            </button>
            <span className="px-3 sm:px-4 font-semibold text-sm sm:text-base min-w-[36px] sm:min-w-[44px] text-center">{quantity}</span>
            <button
              onClick={() => { 
                const newQty = quantity + 1;
                onUpdateQuantity(cart.pk, newQty); 
                setQuantity(newQty); 
              }}
              className="p-1.5 sm:p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!haveInStock}
              aria-label="Увеличить количество"
            >
              <Plus size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Price */}
          <div className="text-left sm:text-right flex-shrink-0">
            <p className="text-base sm:text-lg font-bold text-gray-900">${subtotal.toFixed(2)}</p>
            {selectedStock?.cost && (
              <p className="text-xs text-gray-600">${selectedStock.cost.toFixed(2)} каждый</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
