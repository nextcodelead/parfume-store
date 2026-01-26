'use client'
import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Settings } from 'lucide-react';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import AdminLogin from '../components/admin/AdminLogin';
// import DashboardContent from '../components/admin/DashboardContent';
import ProductsTable from '../components/admin/ProductsTable';
import OrdersTable from '../components/admin/OrdersTable';
import ComingSoon from '../components/admin/ComingSoon';
import CategoriesPage from '../components/admin/CategoriesPage';
import BrandsPage from '../components/admin/BrandsPage';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Проверка аутентификации при загрузке
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('admin_authenticated');
      const authTime = localStorage.getItem('admin_auth_time');
      
      if (authStatus === 'true' && authTime) {
        // Проверяем, не истекла ли сессия (24 часа)
        const timeDiff = Date.now() - parseInt(authTime);
        const hours24 = 24 * 60 * 60 * 1000;
        
        if (timeDiff < hours24) {
          setIsAuthenticated(true);
        } else {
          // Сессия истекла
          localStorage.removeItem('admin_authenticated');
          localStorage.removeItem('admin_auth_time');
        }
      }
      
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_auth_time');
    setIsAuthenticated(false);
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        // return <DashboardContent />;
      
      case 'products':
        return <ProductsTable />;
      
      case 'categories':
        return <CategoriesPage />;
      
      case 'orders':
        return <OrdersTable />;
      
      case 'brands':
        return <BrandsPage />;
      
      case 'customers':
        return (
          <ComingSoon
            icon={<Users size={64} className="mx-auto text-gray-400" />}
            title="Раздел в разработке"
            description="Управление клиентами скоро будет доступно"
          />
        );
      
      case 'analytics':
        return (
          <ComingSoon
            icon={<TrendingUp size={64} className="mx-auto text-gray-400" />}
            title="Раздел в разработке"
            description="Аналитика и отчеты скоро будут доступны"
          />
        );
      
      case 'settings':
        return (
          <ComingSoon
            icon={<Settings size={64} className="mx-auto text-gray-400" />}
            title="Раздел в разработке"
            description="Настройки магазина скоро будут доступны"
          />
        );
      
      default:
        return null;
    }
  };

  // Показываем загрузку при проверке аутентификации
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
          <p className="mt-4 text-gray-600">Проверка доступа...</p>
        </div>
      </div>
    );
  }

  // Показываем форму входа, если не аутентифицирован
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Показываем админ панель, если аутентифицирован
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;