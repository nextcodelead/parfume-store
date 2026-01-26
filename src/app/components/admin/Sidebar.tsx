import React from 'react';
import { X, LogOut, Tag, Layers, BoxIcon } from 'lucide-react';
import { MENU_ITEMS } from '../../data/adminData';
import Link from 'next/link';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isMobileOpen, onMobileClose, onLogout }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 sm:w-72 bg-gray-900 text-white z-50 transform transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-4 sm:p-6 border-b border-gray-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl">🌸</span>
            <div>
              <h1 className="text-base sm:text-lg font-bold">Essence Luxe</h1>
              <p className="text-xs text-gray-400">Админ панель</p>
            </div>
          </Link>
          <button onClick={onMobileClose} className="lg:hidden p-1 hover:bg-gray-800 rounded transition-colors">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto h-[calc(100vh-140px)] lg:h-[calc(100vh-160px)]">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                onMobileClose();
              }}
              className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                activeTab === item.id
                  ? 'bg-rose-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <BoxIcon/>
              <span>Товары</span>
            </button>
          ))}

          {/* Explicit categories and brands buttons in case MENU_ITEMS doesn't include them */}
          <button
            onClick={() => { onTabChange('categories'); onMobileClose(); }}
            className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
              activeTab === 'categories' ? 'bg-rose-600 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Layers size={18} className="sm:w-5 sm:h-5" />
            <span>Категории</span>
          </button>

          <button
            onClick={() => { onTabChange('brands'); onMobileClose(); }}
            className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
              activeTab === 'brands' ? 'bg-rose-600 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Tag size={18} className="sm:w-5 sm:h-5" />
            <span>Бренды</span>
          </button>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-gray-800 bg-gray-900">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors text-sm sm:text-base"
          >
            <LogOut size={18} className="sm:w-5 sm:h-5" />
            <span>Выйти</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;