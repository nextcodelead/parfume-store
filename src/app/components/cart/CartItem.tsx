import { Minus, Plus, X, AlertCircle } from "lucide-react";

type CartItemProps = {
  item: {
    id: number;
    name: string;
    brand: string;
    size: string;
    price: number;
    quantity: number;
    image: React.ReactNode;
    inStock: boolean;
  };
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
};

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const subtotal = item.price * item.quantity;

  return (
    <div className={`bg-white rounded-lg p-4 shadow-md flex gap-4 ${!item.inStock ? "opacity-60" : ""}`}>
      {/* Image */}
      <div className="bg-gray-100 rounded-lg w-24 h-24 flex items-center justify-center text-4xl flex-shrink-0">
        {item.image}
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-gray-600 mb-1">{item.brand}</p>
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-600">Размер: {item.size}</p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {!item.inStock && (
          <div className="flex items-center gap-1 text-red-600 text-sm mb-2">
            <AlertCircle size={16} />
           <span>Нет в наличии</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          {/* Quantity */}
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="p-2 hover:bg-gray-100 transition-colors"
              disabled={!item.inStock}
            >
              <Minus size={16} />
            </button>
            <span className="px-4 font-semibold">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-2 hover:bg-gray-100 transition-colors"
              disabled={!item.inStock}
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">${subtotal.toFixed(2)}</p>
            <p className="text-xs text-gray-600">${item.price.toFixed(2)} каждый</p>
          </div>
        </div>
      </div>
    </div>
  );
};
