import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
            <Menu size={20} className="sm:w-6 sm:h-6" />
          </button>
          
          <div className="relative hidden md:block flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Поиск товаров, заказов, клиентов..."
              className="pl-9 sm:pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} className="sm:w-6 sm:h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l">
            <div className="text-right hidden sm:block">
              <p className="text-xs sm:text-sm font-semibold text-gray-900">Администратор</p>
              <p className="text-xs text-gray-600 hidden md:block">admin@essenceluxe.com</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base flex-shrink-0">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;