'use client'
import React, { useEffect, useState } from "react";
import { ChevronRight, Check, Minus, Plus, Heart, Share2, ShoppingCart } from "lucide-react";
import Button from "../Button";
import { useProductClient } from "@/app/hooks/useProducts";
import { Stock, ProductClientResponse } from "@/app/types/graphql";
import { useAddToCart } from "@/app/hooks/useUserCart";
import { useMeMain } from "@/app/hooks/useMe";


interface Props {
  productId: number;
}

const ProductInfo: React.FC<Props> = ({ productId }) => {
  const { loading, data, error } = useProductClient(productId);
  const { addToCart, loading: addingToCart } = useAddToCart();

  const [selectedSize, setSelectedSize] = useState<Stock | null>(null);

  const productData = data as ProductClientResponse | undefined;

  useEffect(() => {
    const firstStock = productData?.product?.stocks?.[0] ?? null;
    if (firstStock) setSelectedSize(firstStock);
  }, [productData]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);


  const discount = selectedSize?.cost
    ? Math.round((1 - selectedSize.discount / selectedSize.cost) * 100)
    : 0;

  const handleSizeSelect = (pk: number) => {
    if (!productData?.product) return;
    const size = productData.product.stocks.find((s: Stock) => s.pk === pk);
    if (size) {
      setSelectedSize(size);
    }
  };

  const handleQuantityDecrease = () => {
    setQuantity(q => Math.max(1, q - 1));
  };

  const handleQuantityIncrease = () => {
    setQuantity(q => q + 1);
  };

  const handleAddToCart = async () => {
    if (!productData?.product) return;
    console.log('Adding to cart:', {
      productId: productData.product.pk,
      name: productData.product.name,
      size: selectedSize,
      quantity: quantity,
      price: selectedSize?.discount ?? selectedSize?.cost ?? 0
    });
    await addToCart(productData.product.pk, 1);
    // reload page
    window.location.reload();
  };

  const handleShare = (platform: string) => {
    console.log(`Sharing on ${platform}`);
    setShowShareMenu(false);
  };
  if (error) {
    return <div className="text-red-600">Error loading product information: {error.message}</div>;
  }
  if (loading || !productData) {
    return <div>Loading product information...</div>;
  }
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left column on md+: reserved for gallery (page may place ProductImageGallery here) */}
        <div className="order-1 md:order-1">
          {/* If page includes gallery separately, this column will be used by layout.
              Keep this div as placeholder for consistent two-column layout. */}
        </div>

        {/* Right column — product info */}
        <div className="order-2 md:order-2 space-y-5">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 flex items-center gap-2 flex-wrap">
            {productData.product.categoryRoute.map((cat: { name: string }, index: number) => (
              <React.Fragment key={index}>
                <a href={cat.name} className="hover:text-rose-600 transition-colors text-sm">
                  {cat.name}
                </a>
                <ChevronRight size={14} className="text-gray-400" />
              </React.Fragment>
            ))}
            <span className="text-gray-900 font-medium truncate">{productData.product.name}</span>
          </nav>

          {/* Brand & Name */}
          <div>
            <p className="text-rose-600 font-semibold mb-1 text-xs">{productData.product.brand.name}</p>
            <h1 className="text-base sm:text-lg md:text-3xl font-bold text-gray-900 leading-tight">{productData.product.name}</h1>
          </div>

          {/* Price & Stock */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">${selectedSize?.discount ?? 0}</span>
              {selectedSize?.cost ? (
                <>
                  <span className="text-sm sm:text-lg text-gray-500 line-through">${selectedSize?.cost}</span>
                  <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold text-xs">{`-${discount}%`}</span>
                </>
              ) : null}
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              {selectedSize && selectedSize.quantity > 0 ? (
                <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                  <Check size={16} /> In Stock
                </span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
              <span className="text-xs text-gray-500">SKU: {selectedSize?.article}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed text-sm">{productData.product.description}</p>

          {/* Fragrance Notes */}
          <div className="bg-rose-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Fragrance Notes</h3>
            <div className="flex flex-wrap gap-2">
              {productData.product.aromNote?.split(",").map((note: string, index: number) => (
                <span key={index} className="bg-white px-2 py-1 rounded-full text-xs text-gray-700 border border-rose-200">
                  {note.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Size Selection: horizontal on mobile, grid on md */}
          {productData.product.stocks.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Size</label>
              <div className="flex gap-3 overflow-x-auto md:grid md:grid-cols-4 py-1 -mx-1 px-1">
                {productData.product.stocks.map((stock: Stock) => (
                  <button
                    key={stock.pk}
                    onClick={() => handleSizeSelect(stock.pk)}
                    disabled={stock.quantity === 0}
                    className={`flex-shrink-0 py-2 px-3 rounded-lg border-2 font-semibold transition-all min-w-[86px] sm:min-w-[110px] text-left ${
                      selectedSize?.pk === stock.pk
                        ? 'border-rose-600 bg-rose-50 text-rose-600'
                        : stock.quantity > 0
                        ? 'border-gray-300 hover:border-gray-400 text-gray-900'
                        : 'border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{stock.size} {stock.unit}</div>
                        <div className="text-xs text-gray-500 mt-1">Qty: {stock.quantity}</div>
                      </div>
                      {stock.quantity === 0 && <div className="text-xs text-red-500">Out</div>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
            <div className="inline-flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={handleQuantityDecrease}
                disabled={quantity <= 1}
                className={`p-3 transition-colors ${quantity <= 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                <Minus size={16} />
              </button>
              <span className="px-4 sm:px-6 font-semibold text-lg min-w-[48px] text-center">{quantity}</span>
              <button onClick={handleQuantityIncrease} className="p-3 hover:bg-gray-100 transition-colors text-gray-700">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons — stacked on mobile, inline on md */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleAddToCart}
              disabled={!(selectedSize && selectedSize.quantity > 0)}
              leftIcon={<ShoppingCart size={18} />}
              className="w-full"
            >
              {selectedSize && selectedSize.quantity > 0 ? 'Добавить в корзину' : 'Out of Stock'}
            </Button>

            <div className="flex gap-3">
              <Button variant="outline" size="md" onClick={() => setIsFavorite(!isFavorite)} aria-label="Toggle favorite">
                <Heart size={16} className={isFavorite ? 'fill-rose-600 text-rose-600' : ''} />
              </Button>
              <div className="relative">
                <Button variant="outline" size="md" onClick={() => setShowShareMenu(!showShareMenu)} aria-label="Share product">
                  <Share2 size={16} />
                </Button>
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl p-2 z-10 space-y-1 min-w-[140px] border">
                    <button onClick={() => handleShare('facebook')} className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">Facebook</button>
                    <button onClick={() => handleShare('twitter')} className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">Twitter</button>
                    <button onClick={() => handleShare('copy')} className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">Copy Link</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;