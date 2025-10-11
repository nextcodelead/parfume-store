'use client'
import React, { useState } from "react";
import { ChevronRight, Star, Check, Minus, Plus, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react";
import Button from "../Button";

interface ProductSize {
  label: string;
  value: string;
  price: number;
  inStock: boolean;
}

interface ProductFeature {
  icon: React.ReactNode;
  title: string;
  text: string;
}

interface ProductNotes {
  top: string[];
  heart: string[];
  base: string[];
}

interface ProductInfoType {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  sku: string;
  description: string;
  images: string[];
  sizes: ProductSize[];
  notes: ProductNotes;
  features?: ProductFeature[];
}

interface Props {
  productInfo: ProductInfoType;
}

const ProductInfo: React.FC<Props> = ({ productInfo }) => {
  const [selectedSize, setSelectedSize] = useState(productInfo.sizes[0]?.value || '');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const selectedSizeData = productInfo.sizes.find(s => s.value === selectedSize);
  const discount = productInfo.oldPrice
    ? Math.round((1 - productInfo.price / productInfo.oldPrice) * 100)
    : 0;

  // Дефолтные фичи если не переданы в props
  const defaultFeatures = [
    { icon: <Truck size={20} />, title: "Free Shipping", text: "On orders over $100" },
    { icon: <Shield size={20} />, title: "Authentic Product", text: "100% Original Guarantee" },
    { icon: <RotateCcw size={20} />, title: "Easy Returns", text: "30-day return policy" },
  ];

  const features = productInfo.features || defaultFeatures;

  const handleSizeSelect = (sizeValue: string) => {
    const size = productInfo.sizes.find(s => s.value === sizeValue);
    if (size && size.inStock) {
      setSelectedSize(sizeValue);
    }
  };

  const handleQuantityDecrease = () => {
    setQuantity(q => Math.max(1, q - 1));
  };

  const handleQuantityIncrease = () => {
    setQuantity(q => q + 1);
  };

  const handleAddToCart = () => {
    console.log('Adding to cart:', {
      productId: productInfo.id,
      name: productInfo.name,
      size: selectedSize,
      quantity: quantity,
      price: selectedSizeData?.price || productInfo.price
    });
  };

  const handleShare = (platform: string) => {
    console.log(`Sharing on ${platform}`);
    setShowShareMenu(false);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 flex items-center gap-2">
        <a href="#" className="hover:text-rose-600 transition-colors">Home</a>
        <ChevronRight size={16} />
        <a href="#" className="hover:text-rose-600 transition-colors">Fragrances</a>
        <ChevronRight size={16} />
        <a href="#" className="hover:text-rose-600 transition-colors">{productInfo.category}</a>
        <ChevronRight size={16} />
        <span className="text-gray-900 font-medium">{productInfo.name}</span>
      </nav>

      {/* Brand & Name */}
      <div>
        <p className="text-rose-600 font-semibold mb-1">{productInfo.brand}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{productInfo.name}</h1>
        
        {/* Rating & Reviews */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={i < Math.floor(productInfo.rating) 
                  ? 'fill-amber-400 text-amber-400' 
                  : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className="text-gray-700 font-medium">{productInfo.rating.toFixed(1)}</span>
          <a href="#reviews" className="text-rose-600 hover:underline transition-colors">
            ({productInfo.reviews} reviews)
          </a>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-4xl font-bold text-gray-900">
          ${selectedSizeData?.price.toFixed(2) || productInfo.price.toFixed(2)}
        </span>
        {productInfo.oldPrice > 0 && (
          <>
            <span className="text-2xl text-gray-500 line-through">
              ${productInfo.oldPrice.toFixed(2)}
            </span>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold text-sm">
              -{discount}%
            </span>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {productInfo.inStock ? (
          <>
            <Check size={20} className="text-green-600" />
            <span className="text-green-600 font-semibold">In Stock</span>
          </>
        ) : (
          <>
            <span className="text-red-600 font-semibold">Out of Stock</span>
          </>
        )}
        <span className="text-gray-500 text-sm">SKU: {productInfo.sku}</span>
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed text-lg">{productInfo.description}</p>

      {/* Fragrance Notes */}
      <div className="bg-rose-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Fragrance Notes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-medium text-rose-700 mb-2">Top Notes</h4>
            <div className="flex flex-wrap gap-1">
              {productInfo.notes.top.map((note, index) => (
                <span key={index} className="bg-white px-2 py-1 rounded-full text-xs text-gray-700 border border-rose-200">
                  {note}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-rose-700 mb-2">Heart Notes</h4>
            <div className="flex flex-wrap gap-1">
              {productInfo.notes.heart.map((note, index) => (
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
          </div>
        </div>
      </div>

      {/* Size Selection */}
      {productInfo.sizes.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Size
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {productInfo.sizes.map(size => (
              <button
                key={size.value}
                onClick={() => handleSizeSelect(size.value)}
                disabled={!size.inStock}
                className={`py-3 px-2 rounded-lg border-2 font-semibold transition-all ${
                  selectedSize === size.value
                    ? 'border-rose-600 bg-rose-50 text-rose-600'
                    : size.inStock
                    ? 'border-gray-300 hover:border-gray-400 text-gray-900'
                    : 'border-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {size.label}
                {!size.inStock && (
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
          disabled={!productInfo.inStock}
          leftIcon={<ShoppingCart size={20} />}
        >
          {productInfo.inStock ? 'Add to Cart' : 'Out of Stock'}
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
      {features.length > 0 && (
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
      )}
    </div>
  );
};

export default ProductInfo;