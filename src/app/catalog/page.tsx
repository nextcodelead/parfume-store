"use client"
import React, { useState } from 'react';
import { CategoriesMenu } from '../components/CategoriesMenu/CategoriesMenu';
import { FeaturedCategories } from '../components/FeaturedCategories/FeaturedCategories';
import Header from '../components/layout/Header';
const App: React.FC = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Здесь будет Header компонент */}
      <Header />
      {/* Здесь будет HeroSection компонент */}
      
      <FeaturedCategories onOpenCategories={() => setIsCategoriesOpen(true)} />
      
      {/* Categories Menu */}
      <CategoriesMenu 
        isOpen={isCategoriesOpen} 
        onClose={() => setIsCategoriesOpen(false)} 
      />
    </div>
  );
};

export default App;