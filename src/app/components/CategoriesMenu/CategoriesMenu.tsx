import React, { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { Category } from '../../types/types';

interface CategoriesMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CategoriesMenu: React.FC<CategoriesMenuProps> = ({ isOpen, onClose }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

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
                <h2 className="text-lg font-bold text-gray-900">All Categories</h2>
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
              {CATEGORIES_DATA.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  isHovered={hoveredCategory === category.id}
                  onHover={setHoveredCategory}
                  onClick={onClose}
                />
              ))}
            </div>
          </div>

          {hoveredCategory && (
            <SubcategoriesPanel categoryId={hoveredCategory} onClose={onClose} />
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
  onHover: (id: string | null) => void;
  onClick: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ 
  category, 
  isHovered, 
  onHover, 
  onClick 
}) => (
  <button
    onMouseEnter={() => onHover(category.id)}
    onClick={() => {
      console.log('Navigate to:', category.id);
      onClick();
    }}
    className={`w-full flex items-center justify-between p-4 transition-colors ${
      isHovered
        ? 'bg-rose-50 border-r-4 border-rose-600'
        : 'hover:bg-gray-50'
    }`}
  >
    <div className="flex items-center gap-3">
      <span className={`text-3xl p-2 rounded-lg ${category.color}`}>
        {category.icon}
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
  categoryId: string;
  onClose: () => void;
}

const SubcategoriesPanel: React.FC<SubcategoriesPanelProps> = ({ categoryId, onClose }) => {
  const category = CATEGORIES_DATA.find(cat => cat.id === categoryId);
  
  if (!category) return null;

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      {category.subcategories.map((subcat: { name: string; items: string[] }, idx: number) => (
        <div key={idx} className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
            {subcat.name}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {subcat.items.map((item: string, itemIdx: number) => (
              <button
                key={itemIdx}
                onClick={() => {
                  console.log('Navigate to:', item);
                  onClose();
                }}
                className="text-left px-3 py-2 text-sm text-gray-700 hover:text-rose-600 hover:bg-white rounded-lg transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};