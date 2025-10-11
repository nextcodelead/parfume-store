import React from 'react';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { Category } from '../../types/types';

interface FeaturedCategoriesProps {
  onOpenCategories: () => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onOpenCategories }) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES_DATA.slice(0, 8).map((category) => (
            <FeaturedCategoryItem
              key={category.id}
              category={category}
              onClick={onOpenCategories}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeaturedCategoryItemProps {
  category: Category;
  onClick: () => void;
}

const FeaturedCategoryItem: React.FC<FeaturedCategoryItemProps> = ({ category, onClick }) => (
  <button
    onClick={onClick}
    className={`${category.color} rounded-xl p-6 hover:scale-105 transition-transform text-center`}
  >
    <div className="text-5xl mb-3">{category.icon}</div>
    <h3 className="font-semibold text-gray-900">{category.name}</h3>
  </button>
);