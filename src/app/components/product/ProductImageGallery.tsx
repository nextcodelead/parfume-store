"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
}

const ProductImageGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-gray-100 rounded-2xl aspect-square flex items-center justify-center overflow-hidden group">
        <div className="text-9xl">{images[currentImage]}</div>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImage(curr => curr === 0 ? images.length - 1 : curr - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setCurrentImage(curr => curr === images.length - 1 ? 0 : curr + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            className={`bg-gray-100 rounded-lg aspect-square flex items-center justify-center text-4xl transition-all hover:scale-105 ${
              currentImage === idx ? 'ring-2 ring-rose-600' : ''
            }`}
          >
            {img}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
