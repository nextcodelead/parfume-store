"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProductImagesClient } from "@/app/hooks/useProducts";
import { ProductImage } from "@/app/types/graphql";

interface Props {
  productId: number;
}

interface ProductImagesResponse {
  product: {
    images: ProductImage[];
  };
}

const ProductImageGallery: React.FC<Props> = ({ productId }) => {
  const {loading, data, error} = useProductImagesClient(productId);
  const [currentImage, setCurrentImage] = useState(0);
  if (error) {
    return <div>Error loading images</div>;
  }
  if (loading || !data) {
    return <div>Loading images...</div>;
  }
  const response = data as ProductImagesResponse;
  const images = response.product.images.map((img: ProductImage) => img.imageUrl);
  return (
    <div className="space-y-4">
      {/* Main Image — responsive, поддерживает узкие экраны */}
      <div className="relative bg-gray-100 rounded-2xl w-full overflow-hidden group">
        <div className="w-full h-[180px] sm:h-[220px] md:aspect-square md:h-auto flex items-center justify-center">
          <Image 
            src={images.length > 0 ? `https://dataset.uz/${images[currentImage]}` : 'https://placehold.jp/3d4070/ffffff/150x150.png?text=No%20image'} 
            alt={`Product Image ${currentImage + 1}`} 
            width={800}
            height={800}
            className="object-contain w-full h-full"
            unoptimized
          />
        </div>

        {/* Navigation Arrows — на мобилке видны всегда (touch), на десктопе показываем по hover */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImage(curr => curr === 0 ? images.length - 1 : curr - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              aria-label="prev image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentImage(curr => curr === images.length - 1 ? 0 : curr + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              aria-label="next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails: horizontal scroll on mobile, grid on md+ */}
      <div className="flex gap-2 overflow-x-auto md:overflow-visible py-1 -mx-1 px-1 p-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            className={`flex-shrink-0 w-[52px] h-[52px] sm:w-[64px] sm:h-[64px] md:aspect-square rounded-lg bg-gray-100 flex items-center justify-center transition-transform hover:scale-105 ${
              currentImage === idx ? 'ring-2 ring-rose-600' : ''
            }`}
            aria-label={`Show image ${idx + 1}`}
          >
            <Image
              src={`https://dataset.uz/${images[idx]}`} 
              alt={`Product Image ${idx + 1}`} 
              width={150}
              height={150}
              className="object-contain w-full h-full"
              unoptimized
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
