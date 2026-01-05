'use client'
import React, { useEffect, useState } from "react";
import { ChevronRight, Check, Minus, Plus, Heart, Share2, ShoppingCart } from "lucide-react";
import Button from "../Button";
import { useProductClient } from "@/app/hooks/useProducts";
import { Stock, ProductClientResponse } from "@/app/types/graphql";
import { useAddToCart } from "@/app/hooks/useUserCart";


interface Props {
  productId: number;
}

const ProductInfo: React.FC<Props> = ({ productId }) => {
  const { loading, data, error } = useProductClient(productId);
  const { addToCart } = useAddToCart();

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
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-red-600 text-sm sm:text-base">Error loading product information: {error.message}</div>
      </div>
    );
  }
  if (loading || !productData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-gray-600 text-sm sm:text-base">Loading product information...</div>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="grid  gap-4 sm:gap-6 lg:gap-8 items-start">
        {/* Left column on lg+: reserved for gallery (page may place ProductImageGallery here) */}
        <div className="order-1 lg:order-1">
          {/* If page includes gallery separately, this column will be used by layout.
              Keep this div as placeholder for consistent two-column layout. */}
        </div>

        {/* Right column — product info */}
        <div className="order-2 lg:order-2 space-y-4 sm:space-y-5 lg:space-y-6">
          {/* Breadcrumb */}
          {productData.product.categoryRoute && productData.product.categoryRoute.length > 0 && (
            <nav className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2 flex-wrap overflow-hidden">
              {productData.product.categoryRoute.map((cat: { name: string }, index: number) => (
                <React.Fragment key={index}>
                  <a href={cat.name} className="hover:text-rose-600 transition-colors truncate max-w-[120px] sm:max-w-none">
                    {cat.name}
                  </a>
                  <ChevronRight size={12} className="text-gray-400 flex-shrink-0 sm:w-3.5 sm:h-3.5" />
                </React.Fragment>
              ))}
              <span className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-none">{productData.product.name}</span>
            </nav>
          )}

          {/* Brand & Name */}
          <div className="space-y-1 sm:space-y-2">
            <p className="text-rose-600 font-semibold text-xs sm:text-sm">{productData.product.brand.name}</p>
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{productData.product.name}</h1>
          </div>

          {/* Price & Stock */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">${selectedSize?.discount ?? 0}</span>
              {selectedSize?.cost ? (
                <>
                  <span className="text-base sm:text-lg md:text-xl text-gray-500 line-through">${selectedSize?.cost}</span>
                  <span className="bg-red-100 text-red-600 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-semibold text-xs sm:text-sm">{`-${discount}%`}</span>
                </>
              ) : null}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
              {selectedSize && selectedSize.quantity > 0 ? (
                <span className="inline-flex items-center gap-1.5 sm:gap-2 text-green-600 font-medium">
                  <Check size={14} className="sm:w-4 sm:h-4" /> <span>In Stock</span>
                </span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
              {selectedSize?.article && (
                <span className="text-gray-500 text-xs sm:text-sm">SKU: {selectedSize.article}</span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{productData.product.description}</p>

          {/* Fragrance Notes */}
          {productData.product.aromNote && (
            <div className="bg-rose-50 rounded-lg p-3 sm:p-4 lg:p-5">
              <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Fragrance Notes</h3>
              <div className="flex flex-wrap gap-2">
                {productData.product.aromNote.split(",").map((note: string, index: number) => (
                  <span key={index} className="bg-white px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm text-gray-700 border border-rose-200">
                    {note.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection: horizontal on mobile, grid on md */}
          {productData.product.stocks.length > 0 && (
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Size</label>
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 -mx-1 px-1 sm:-mx-2 sm:px-2">
                {productData.product.stocks.map((stock: Stock) => (
                  <button
                    key={stock.pk}
                    onClick={() => handleSizeSelect(stock.pk)}
                    disabled={stock.quantity === 0}
                    className={`flex-shrink-0 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg border-2 font-semibold transition-all min-w-[100px] sm:min-w-[120px] md:min-w-0 text-left ${
                      selectedSize?.pk === stock.pk
                        ? 'border-rose-600 bg-rose-50 text-rose-600'
                        : stock.quantity > 0
                        ? 'border-gray-300 hover:border-gray-400 text-gray-900'
                        : 'border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-sm sm:text-base">{stock.size} {stock.unit}</div>
                        <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">Qty: {stock.quantity}</div>
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
            <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-2">Quantity</label>
            <div className="inline-flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={handleQuantityDecrease}
                disabled={quantity <= 1}
                className={`p-2.5 sm:p-3 transition-colors ${quantity <= 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-700'}`}
                aria-label="Decrease quantity"
              >
                <Minus size={16} className="sm:w-5 sm:h-5" />
              </button>
              <span className="px-4 sm:px-6 lg:px-8 font-semibold text-base sm:text-lg min-w-[44px] sm:min-w-[52px] text-center">{quantity}</span>
              <button 
                onClick={handleQuantityIncrease} 
                className="p-2.5 sm:p-3 hover:bg-gray-100 transition-colors text-gray-700"
                aria-label="Increase quantity"
              >
                <Plus size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Action Buttons — stacked on mobile, inline on md */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleAddToCart}
              disabled={!(selectedSize && selectedSize.quantity > 0)}
              leftIcon={<ShoppingCart size={18} className="sm:w-5 sm:h-5" />}
              className="w-full sm:w-auto sm:flex-1"
            >
              {selectedSize && selectedSize.quantity > 0 ? 'Добавить в корзину' : 'Out of Stock'}
            </Button>

            <div className="flex gap-2 sm:gap-3 justify-center sm:justify-start">
              <Button 
                variant="outline" 
                size="md" 
                onClick={() => setIsFavorite(!isFavorite)} 
                aria-label="Toggle favorite"
                className="px-3 sm:px-4"
              >
                <Heart size={16} className={`sm:w-5 sm:h-5 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
              </Button>
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="md" 
                  onClick={() => setShowShareMenu(!showShareMenu)} 
                  aria-label="Share product"
                  className="px-3 sm:px-4"
                >
                  <Share2 size={16} className="sm:w-5 sm:h-5" />
                </Button>
                {showShareMenu && (
                  <div className="absolute right-0 sm:right-auto sm:left-0 mt-2 bg-white rounded-lg shadow-xl p-2 z-10 space-y-1 min-w-[140px] sm:min-w-[160px] border">
                    <button onClick={() => handleShare('facebook')} className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-xs sm:text-sm transition-colors">Facebook</button>
                    <button onClick={() => handleShare('twitter')} className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-xs sm:text-sm transition-colors">Twitter</button>
                    <button onClick={() => handleShare('copy')} className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-xs sm:text-sm transition-colors">Copy Link</button>
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