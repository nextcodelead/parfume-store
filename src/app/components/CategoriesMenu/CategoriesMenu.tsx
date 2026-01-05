import React, { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Subcategory } from '../../types/graphql';
// Category тип теперь импортируем из useCategories.ts
import type { Category as BaseCategory } from '../../hooks/useCategories';
import { useCategories } from '../../hooks/useCategories';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
        className={`fixed inset-0 z-40 transition-opacity duration-300 bg-black/50 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-2xl z-50 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${hoveredCategory ? 'lg:w-[800px] w-full' : 'w-full lg:w-80'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full flex-col lg:flex-row">
          {/* Left Side - Main Categories */}
          <div className="w-full lg:w-80 border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-white flex-shrink-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Все категории</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Закрыть меню"
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
            <SubcategoriesPanel 
              subcategories={categories.find(cat => cat.pk === hoveredCategory)?.children ?? []} 
              onClose={onClose}
              onBack={() => setHoveredCategory(null)}
            />
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
}) => {
  const router = useRouter();
  const hasSubcategories = category.children && category.children.length > 0;
  
  const handleClick = (e: React.MouseEvent) => {
    if (hasSubcategories) {
      // Если есть подкатегории, показываем их
      // На мобильных это переключит состояние, на десктопе hover уже показал подкатегории
      e.preventDefault();
      e.stopPropagation();
      onHover(isHovered ? null : category.pk);
    } else {
      // Если подкатегорий нет, переходим на страницу категории
      onClick();
      router.push(`/catalog/${category.pk}`);
    }
  };

  return (
    <div
      onMouseEnter={() => {
        // На десктопе показываем подкатегории при hover
        if (hasSubcategories) {
          onHover(category.pk);
        }
      }}
      className={`w-full transition-colors ${
        isHovered
          ? 'bg-rose-50 border-r-4 border-rose-600'
          : 'hover:bg-gray-50'
      }`}
    >
      {hasSubcategories ? (
        <button
          onClick={handleClick}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <div className="flex items-center gap-3 flex-1">
            <span className="text-3xl p-2 rounded-lg flex-shrink-0">
              {category.iconUrl}
            </span>
            <span className="font-medium text-gray-900">
              {category.name}
            </span>
          </div>
          <ChevronRight 
            size={20} 
            className={`transition-colors flex-shrink-0 ${
              isHovered ? 'text-rose-600' : 'text-gray-400'
            }`}
          />
        </button>
      ) : (
        <Link
          href={`/catalog/${category.pk}`}
          onClick={onClick}
          className="w-full flex items-center justify-between p-4"
        >
          <div className="flex items-center gap-3 flex-1">
            <span className="text-3xl p-2 rounded-lg flex-shrink-0">
              {category.iconUrl}
            </span>
            <span className="font-medium text-gray-900">
              {category.name}
            </span>
          </div>
          <ChevronRight 
            size={20} 
            className="text-gray-400 flex-shrink-0"
          />
        </Link>
      )}
    </div>
  );
};

interface SubcategoriesPanelProps {
  subcategories: Subcategory[];
  onClose: () => void;
  onBack?: () => void;
}

const SubcategoriesPanel: React.FC<SubcategoriesPanelProps> = ({ subcategories, onClose, onBack }) => {
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
    <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
      {/* Back button для мобильных */}
      {onBack && (
        <button
          onClick={onBack}
          className="lg:hidden mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
        >
          <ChevronRight size={18} className="rotate-180" />
          <span>Назад к категориям</span>
        </button>
      )}
      {subcategoriesFormatted.map((subcat, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
            {subcat.groupName}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {subcat.items.map((item, itemIdx) => (
              <Link
                key={itemIdx}
                href={`/catalog/${item.pk}`}
                onClick={onClose}
                className="text-left px-3 py-2 text-sm text-gray-700 hover:text-rose-600 hover:bg-white rounded-lg transition-colors"
                aria-label={`Перейти на страницу категории ${item.name}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};