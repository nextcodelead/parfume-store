'use client'
import React, { useState } from 'react';
import { Users, TrendingUp, Settings, Tag, Layers } from 'lucide-react';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
// import DashboardContent from '../components/admin/DashboardContent';
import ProductsTable from '../components/admin/ProductsTable';
import OrdersTable from '../components/admin/OrdersTable';
import ComingSoon from '../components/admin/ComingSoon';
import CategoriesPage from '../components/admin/CategoriesPage';
import BrandsPage from '../components/admin/BrandsPage';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />
      
      <div className="flex-1 lg:ml-0">
        <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />
        
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;