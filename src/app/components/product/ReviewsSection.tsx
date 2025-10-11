'use client';

import { useState } from "react";
import { Check, Star } from "lucide-react";
import Button from "../Button";
import { REVIEWS_DATA } from "../../data/productsData";

const ReviewsSection: React.FC = () => {
  const [sortBy, setSortBy] = useState("recent");

  return (
    <div id="reviews" className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Отзывы покупателей</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <option value="recent">Самые новые</option>
          <option value="helpful">Самые полезные</option>
          <option value="rating">С наивысшей оценкой</option>
        </select>
      </div>

      <div className="space-y-6">
        {REVIEWS_DATA.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{review.author}</span>
                  {review.verified && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Check size={12} /> Проверенный покупатель
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-3">{review.text}</p>

            <button className="text-sm text-gray-600 hover:text-rose-600">
              Полезно ({review.helpful})
            </button>
          </div>
        ))}
      </div>

      <Button variant="outline" fullWidth className="mt-6">
        Показать больше отзывов
      </Button>
    </div>
  );
};

export default ReviewsSection;
