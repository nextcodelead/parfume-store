'use client'
import React, { useEffect, useState } from "react";
import { ChevronRight, Check, Minus, Plus, Heart, Share2, ShoppingCart } from "lucide-react";
import Button from "../Button";
import { useProductClient } from "@/app/hooks/useProducts";
import { Stock, ProductClientResponse } from "@/app/types/graphql";


interface Props {
  productId: number;
}

const ProductInfo: React.FC<Props> = ({ productId }) => {
  const { loading, data, error } = useProductClient(productId);

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

  const handleAddToCart = () => {
    if (!productData?.product) return;
    console.log('Adding to cart:', {
      productId: productData.product.pk,
      name: productData.product.name,
      size: selectedSize,
      quantity: quantity,
      price: selectedSize?.discount ?? selectedSize?.cost ?? 0
    });
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
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 flex items-center gap-2">
        {productData.product.categoryRoute.map((cat: { name: string }, index: number) => (
          <React.Fragment key={index}>
            <a
              href={cat.name}
              className="hover:text-rose-600 transition-colors"
            >
              {cat.name}
            </a>

            <ChevronRight size={16} />
          </React.Fragment>
        ))}

        {/* Конечный элемент — название продукта */}
        <span className="text-gray-900 font-medium">
          {productData.product.name}
        </span>
      </nav>

      {/* Brand & Name */}
      <div>
        <p className="text-rose-600 font-semibold mb-1">{productData.product.brand.name}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{productData.product.name}</h1>
        
        {/* Rating & Reviews */}
        {/* <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={i < Math.floor(data.product.starsRating) 
                  ? 'fill-amber-400 text-amber-400' 
                  : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className="text-gray-700 font-medium">{data.product.starsRating.toFixed(1)}</span>
          <a href="#reviews" className="text-rose-600 hover:underline transition-colors">
            ({data.product.countReviews} reviews)
          </a>
        </div> */}
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-4xl font-bold text-gray-900">
          {/* ${selectedSize?.discount.toFixed(2)} */}
          ${selectedSize?.discount}
        </span>
        {selectedSize?.cost && selectedSize.cost > 0 && (
          <>
            <span className="text-2xl text-gray-500 line-through">
              {/* ${selectedSize?.cost.toFixed(2)} */}
              ${selectedSize?.cost}
            </span>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold text-sm">
              -{discount}%
            </span>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {selectedSize && selectedSize.quantity > 0 ? (
          <>
            <Check size={20} className="text-green-600" />
            <span className="text-green-600 font-semibold">In Stock</span>
          </>
        ) : (
          <>
            <span className="text-red-600 font-semibold">Out of Stock</span>
          </>
        )}
        <span className="text-gray-500 text-sm">SKU: {selectedSize?.article}</span>
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed text-lg">{productData.product.description}</p>

      {/* Fragrance Notes */}
      <div className="bg-rose-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Fragrance Notes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-medium text-rose-700 mb-2">Top Notes</h4>
            <div className="flex flex-wrap gap-1">
              {productData.product.aromNote?.split(",").map((note: string, index: number) => (
                <span key={index} className="bg-white px-2 py-1 rounded-full text-xs text-gray-700 border border-rose-200">
                  {note}
                </span>
              ))}
            </div>
          </div>
            {/* <div>
              <h4 className="text-sm font-medium text-rose-700 mb-2">Heart Notes</h4>
              <div className="flex flex-wrap gap-1">
                {data.product.notes.heart.map((note, index) => (
                  <span key={index} className="bg-white px-2 py-1 rounded-full text-xs text-gray-700 border border-rose-200">
                    {note}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-rose-700 mb-2">Base Notes</h4>
              <div className="flex flex-wrap gap-1">
                {productInfo.notes.base.map((note, index) => (
                  <span key={index} className="bg-white px-2 py-1 rounded-full text-xs text-gray-700 border border-rose-200">
                    {note}
                  </span>
                ))}
              </div>
            </div> */}
        </div>
      </div>

      {/* Size Selection */}
      {productData.product.stocks.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Size
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {productData.product.stocks.map((stock: Stock) => (
              <button
                key={stock.pk}
                onClick={() => handleSizeSelect(stock.pk)}
                disabled={stock.quantity === 0}
                className={`py-3 px-2 rounded-lg border-2 font-semibold transition-all ${
                  selectedSize?.pk === stock.pk
                    ? 'border-rose-600 bg-rose-50 text-rose-600'
                    : stock.quantity > 0
                    ? 'border-gray-300 hover:border-gray-400 text-gray-900'
                    : 'border-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {stock.quantity} {stock.unit}
                {stock.quantity === 0 && (
                  <span className="block text-xs font-normal mt-1">Out of Stock</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Quantity
        </label>
        <div className="inline-flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={handleQuantityDecrease}
            disabled={quantity <= 1}
            className={`p-3 transition-colors ${
              quantity <= 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Minus size={20} />
          </button>
          <span className="px-6 font-semibold text-lg min-w-[60px] text-center">
            {quantity}
          </span>
          <button
            onClick={handleQuantityIncrease}
            className="p-3 hover:bg-gray-100 transition-colors text-gray-700"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleAddToCart}
          disabled={!(selectedSize && selectedSize.quantity > 0)}
          leftIcon={<ShoppingCart size={20} />}
        >
          {selectedSize && selectedSize.quantity > 0 ? 'Добавить в корзину' : 'Out of Stock'}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart 
            size={20} 
            className={isFavorite ? 'fill-rose-600 text-rose-600' : ''} 
          />
        </Button>
        <div className="relative">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowShareMenu(!showShareMenu)}
            aria-label="Share product"
          >
            <Share2 size={20} />
          </Button>
          {showShareMenu && (
            <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl p-2 z-10 space-y-1 min-w-[140px] border">
              <button 
                onClick={() => handleShare('facebook')}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm transition-colors"
              >
                Facebook
              </button>
              <button 
                onClick={() => handleShare('twitter')}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm transition-colors"
              >
                Twitter
              </button>
              <button 
                onClick={() => handleShare('copy')}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm transition-colors"
              >
                Copy Link
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      {/* {features.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center flex flex-col items-center">
              <div className="flex justify-center mb-2 text-rose-600">
                {feature.icon}
              </div>
              <p className="font-semibold text-sm mb-1">{feature.title}</p>
              <p className="text-xs text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default ProductInfo;