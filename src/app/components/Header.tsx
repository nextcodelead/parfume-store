'use client'
import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Heart } from 'lucide-react';
import { CART_ITEMS } from "../data/cartProductsData";
import { WISHLIST_ITEMS } from "../data/wishListData";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { CategoriesMenu } from '../components/CategoriesMenu/CategoriesMenu'; // Импорт компонента категорий

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
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onOpenFilters }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false); // Состояние для меню категорий
  const router = useRouter();

  // ✅ Функция перехода
  const goToPage = (page: 'cart' | 'wishlist') => {
    router.push(`/${page}`);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Верхняя панель */}
          <div className="flex items-center justify-between">
            {/* Логотип */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-4xl">{SITE_CONFIG.logo}</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{SITE_CONFIG.brandName}</h1>
                <p className="text-xs text-gray-600">{SITE_CONFIG.tagline}</p>
              </div>
            </Link>

            {/* Кнопка Каталога (Категории) */}
            <button
              onClick={() => setIsCategoriesOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium ml-4"
            >
              <Menu size={20} />
              <span className="hidden md:inline">Каталог</span>
            </button>

            {/* Поиск */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Найти парфюм..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <Search className="absolute right-4 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex items-center gap-4">
              {/* ❤️ Избранное */}
              {/* <button
                onClick={() => goToPage('wishlist')}
                className={`hover:text-rose-600 relative ${activeTab === 'wishlist' ? 'text-rose-600' : ''}`}
              >
                <Heart size={24} className={activeTab === 'wishlist' ? 'fill-rose-600' : ''} />
                {WISHLIST_ITEMS.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {WISHLIST_ITEMS.length}
                  </span>
                )}
              </button> */}

              {/* 🛒 Корзина */}
              <button
                onClick={() => goToPage('cart')}
                className={`hover:text-rose-600 relative ${activeTab === 'cart' ? 'text-rose-600' : ''}`}
              >
                <ShoppingCart size={24} />
                {CART_ITEMS.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {CART_ITEMS.length}
                  </span>
                )}
              </button>

              {/* Меню (мобилка) */}
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Навигация */}
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block mt-4`}>
            <ul className="flex flex-col md:flex-row gap-6 md:justify-center text-gray-700 font-medium">
              <li><Link href="/" className="hover:text-rose-600">Главная</Link></li>
              <li>
                <button 
                  onClick={() => setIsCategoriesOpen(true)}
                  className="hover:text-rose-600 font-medium"
                >
                  Каталог
                </button>
              </li>
              <li><Link href="/#new" className="hover:text-rose-600">Новинки</Link></li>
              <li><Link href="/#sale" className="hover:text-rose-600">Скидки</Link></li>
              <li><Link href="/#about" className="hover:text-rose-600">О нас</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Меню категорий */}
      <CategoriesMenu 
        isOpen={isCategoriesOpen} 
        onClose={() => setIsCategoriesOpen(false)} 
      />
    </>
  );
};

export default Header;