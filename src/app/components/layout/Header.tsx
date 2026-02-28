'use client'
import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Heart } from 'lucide-react';
import { CART_ITEMS } from "../../data/cartProductsData";
import { WISHLIST_ITEMS } from "../../data/wishListData";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { CategoriesMenu } from '../CategoriesMenu/CategoriesMenu'; // Импорт компонента категорий
import { useMeMain } from '../../hooks/useMe';

interface SiteConfig {
  brandName: string;
  logo: string;
  tagline: string;
  currency: string;
  socialLinks: {
    instagram: string;
    facebook: string;
  };
}

const SITE_CONFIG: SiteConfig = {
  brandName: "Essence Luxe",
  logo: "🌸",
  tagline: "Откройте свой уникальный аромат",
  currency: "$",
  socialLinks: {
    instagram: "#",
    facebook: "#"
  }
};

interface HeaderProps {
  activeTab?: 'cart' | 'wishlist';
  onTabChange?: (tab: 'cart' | 'wishlist') => void;
  onOpenFilters?: () => void;
  /** Поиск на главной: значение и обработчик (когда переданы — поле управляемое) */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onOpenFilters, searchValue, onSearchChange }) => {
  const { data, loading, error } = useMeMain();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false); // Состояние для меню категорий
  const router = useRouter();

  // ✅ Функция перехода
  const goToPage = (page: 'cart' | 'wishlist') => {
    router.push(`/${page}`);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 py-2 sm:px-4 sm:py-3">
          {/* Верхняя панель */}
          <div className="flex items-center justify-between">
            {/* Логотип */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl md:text-4xl">{SITE_CONFIG.logo}</span>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-base md:text-2xl font-bold text-gray-900 truncate">{SITE_CONFIG.brandName}</h1>
                <p className="hidden md:block text-xs text-gray-600">{SITE_CONFIG.tagline}</p>
              </div>
            </Link>

            {/* Поиск скрыт на узких экранах */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Найти парфюм..."
                  value={searchValue ?? ''}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                />
                <Search className="absolute right-4 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex items-center gap-2">
              {/* десктоп – иконка корзины */}
              <button
                onClick={() => goToPage('cart')}
                className={`hidden md:inline-flex hover:text-rose-600 relative ${activeTab === 'cart' ? 'text-rose-600' : ''}`}
                aria-label="Корзина"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                  {data?.me?.countProductInUserCart || 0}
                </span>
              </button>

              {/* Меню (мобилка) */}
              <button className="p-2 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Меню">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Навигация */}
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block mt-3`}>
            <ul className="flex flex-col md:flex-row gap-2 md:gap-6 md:justify-center text-gray-700 font-medium text-sm">
              <li><Link href="/" className="hover:text-rose-600 block px-2 py-2">Главная</Link></li>
              <li>
                <button 
                  onClick={() => setIsCategoriesOpen(true)}
                  className="hover:text-rose-600 font-medium block px-2 py-2"
                >
                  Каталог
                </button>
              </li>
              <li><Link href="/new" className="hover:text-rose-600 block px-2 py-2">Новинки</Link></li>
              <li><Link href="/sale" className="hover:text-rose-600 block px-2 py-2">Акции</Link></li>
              <li><Link href="/about-us" className="hover:text-rose-600 block px-2 py-2">О нас</Link></li>
              <li><Link href="/admin" className="hover:text-rose-600 block px-2 py-2">Админ-панель</Link></li>
              <li className="md:hidden">
                <button
                  onClick={() => { setIsMenuOpen(false); goToPage('cart'); }}
                  className="flex items-center gap-2 px-2 py-2 font-semibold hover:text-rose-600"
                >
                  Корзина
                  {data?.me?.countProductInUserCart ? (
                    <span className="ml-2 bg-rose-600 text-white text-xs rounded-full px-2 py-0.5">{data.me.countProductInUserCart}</span>
                  ) : null}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Меню категорий */}
      <CategoriesMenu isOpen={isCategoriesOpen} onClose={() => setIsCategoriesOpen(false)} />
    </>
  );
};

export default Header;