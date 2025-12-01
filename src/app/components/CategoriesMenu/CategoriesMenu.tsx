import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Subcategory } from '../../types/graphql';
// Category тип теперь импортируем из useCategories.ts
import type { Category as BaseCategory } from '../../hooks/useCategories';
import { useCategories } from '../../hooks/useCategories';

interface CategoriesMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Расширяем Category для поддержки children
interface Category extends BaseCategory {
  children?: Subcategory[];
}

export const CategoriesMenu: React.FC<CategoriesMenuProps> = ({ isOpen, onClose }) => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const { data, loading, error } = useCategories();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;
  const categories =
    data && typeof data === "object" && data !== null && "categories" in data
      ? (data as { categories: Category[] }).categories
      : [];
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: hoveredCategory ? '800px' : '320px' }}
      >
        <div className="flex h-full">
          {/* Left Side - Main Categories */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-white">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900"> All Categories</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Categories List */}
            <div className="flex-1 overflow-y-auto">
              {categories.map((category) => (
                <CategoryItem
                  key={category.pk}
                  category={category}
                  isHovered={hoveredCategory === category.pk}
                  onHover={setHoveredCategory}
                  onClick={onClose}
                />
              ))}
            </div>
          </div>

          {hoveredCategory && (
            <SubcategoriesPanel subcategories={categories.find(cat => cat.pk === hoveredCategory)?.children ?? []} onClose={onClose} />
          )}
        </div>
      </div>
    </>
  );
};

// Компонент элемента категории
interface CategoryItemProps {
  category: Category;
  isHovered: boolean;
  onHover: (id: number | null) => void;
  onClick: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ 
  category, 
  isHovered, 
  onHover, 
  onClick 
}) => (
  <button
    onMouseEnter={() => onHover(category.pk)}
    onClick={() => {
      console.log('Navigate to:', category.pk);
      onClick();
    }}
    className={`w-full flex items-center justify-between p-4 transition-colors ${
      isHovered
        ? 'bg-rose-50 border-r-4 border-rose-600'
        : 'hover:bg-gray-50'
    }`}
  >
    <div className="flex items-center gap-3">
      {/* <span className={`text-3xl p-2 rounded-lg ${category.color}`}> */}
      <span className={`text-3xl p-2 rounded-lg red`}>
        {category.iconUrl}
      </span>
      <span className="font-medium text-gray-900 text-left">
        {category.name}
      </span>
    </div>
    <ChevronRight 
      size={20} 
      className={`transition-colors ${
        isHovered ? 'text-rose-600' : 'text-gray-400'
      }`}
    />
  </button>
);

// Компонент панели подкатегорий
interface SubcategoriesPanelProps {
  subcategories: Subcategory[];
  onClose: () => void;
}

const SubcategoriesPanel: React.FC<SubcategoriesPanelProps> = ({ subcategories, onClose }) => {
  if (!subcategories) return null;
  const groupByGroupName: { [key: string]: { pk: number; name: string }[] } = {};
  subcategories.forEach((subcat) => {
    const groupName = subcat.groupName || 'Other';
    if (!groupByGroupName[groupName]) {
      groupByGroupName[groupName] = [];
    }
    groupByGroupName[groupName].push({
      pk: subcat.pk,
      name: subcat.name,
    });
  });

  const subcategoriesFormatted = Object.entries(groupByGroupName).map(([groupName, items]) => ({
    groupName,
    items,
  }));
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      {subcategoriesFormatted.map((subcat, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
            {subcat.groupName}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {subcat.items.map((item, itemIdx) => (
              <button
                key={itemIdx}
                onClick={() => {
                  console.log('Navigate to:', item.pk);
                  onClose();
                }}
                className="text-left px-3 py-2 text-sm text-gray-700 hover:text-rose-600 hover:bg-white rounded-lg transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};