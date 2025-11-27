import { Minus, Plus, X, AlertCircle } from "lucide-react";
import StockSelect, { Stock } from "../CategoriesMenu/StockSelect";
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

  {JSON.stringify(selectedStock)}
  return (
    <div className={`bg-white rounded-lg p-4 shadow-md flex gap-4 ${!haveInStock ? "opacity-60" : ""}`}>
      {/* Image */}
      <div className="bg-gray-100 rounded-lg w-24 h-24 flex items-center justify-center text-4xl flex-shrink-0">
        <img src={cart.product.photo ? `https://dataset.uz/${cart.product.photo.imageUrl}` : "https://placehold.jp/3d4070/ffffff/150x150.png?text=No%20image"} alt={cart.product.brand.name} className="max-w-full max-h-full" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-gray-600 mb-1">{cart.product.brand.name}</p>
            <h3 className="font-semibold text-gray-900">{cart.product.name}</h3>
          </div>
          <button
            onClick={() => onRemove(cart.pk)}
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {!haveInStock && (
          <div className="flex items-center gap-1 text-red-600 text-sm mb-2">
            <AlertCircle size={16} />
           <span>Нет в наличии</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          {/* stock */}
          {cart.product.stocksCount > 0 && (
          <StockSelect productId={cart.product.pk} onChange={(value) => {setSelectedStock(value); onSetStock(cart.pk, value);}} />
          )}
          {/* Quantity */}
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => { onUpdateQuantity(cart.pk, Math.max(1, quantity - 1)); setQuantity(Math.max(1, quantity - 1)); }}
              className="p-2 hover:bg-gray-100 transition-colors"
              disabled={!haveInStock}
            >
              <Minus size={16} />
            </button>
            <span className="px-4 font-semibold">{quantity}</span>
            <button
              onClick={() => { onUpdateQuantity(cart.pk, quantity + 1); setQuantity(quantity + 1); }}
              className="p-2 hover:bg-gray-100 transition-colors"
              disabled={!haveInStock}
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">${subtotal.toFixed(2)}</p>
            <p className="text-xs text-gray-600">${selectedStock?.cost.toFixed(2)} каждый</p>
          </div>
        </div>
      </div>
    </div>
  );
};
