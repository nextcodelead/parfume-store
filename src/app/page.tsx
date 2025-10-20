
import React from 'react';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
// import CategoryCard from './components/CategoryCard';
import Header from './components/Header';
import GraphQLDemo from './components/GraphQLDemo';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category?: string;
  oldPrice?: number;
  discount?: number;
  isNew?: boolean;
}

// Categories (commented out as not currently used)
// const CATEGORIES: Category[] = [
//   { id: 1, name: "Женщинам", image: "🌹", bgColor: "bg-pink-100" },
//   { id: 2, name: "Мужчинам", image: "🌲", bgColor: "bg-blue-100" },
//   { id: 3, name: "Унисекс", image: "✨", bgColor: "bg-purple-100" },
//   { id: 4, name: "Люкс", image: "👑", bgColor: "bg-amber-100" }
// ];

const SALE_PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: "Ванильный Шёлк", 
    price: 69.99, 
    oldPrice: 89.99, 
    image: "🍦", 
    rating: 4.7, 
    reviews: 184, 
    category: "Женщины", 
    discount: 22
  },
  { 
    id: 2, 
    name: "Свежий Цитрус", 
    price: 59.00, 
    oldPrice: 75.00, 
    image: "🍋", 
    rating: 4.5, 
    reviews: 210, 
    category: "Мужчины", 
    discount: 21
  },
  { 
    id: 3, 
    name: "Тёплый Кашемир", 
    price: 85.00, 
    oldPrice: 110.00, 
    image: "🕯️", 
    rating: 4.9, 
    reviews: 172, 
    category: "Унисекс", 
    discount: 23
  },
  { 
    id: 4, 
    name: "Белый Жасмин", 
    price: 99.00, 
    oldPrice: 125.00, 
    image: "🌼", 
    rating: 4.8, 
    reviews: 193, 
    category: "Люкс", 
    discount: 20
  }
];

const NEW_PRODUCTS: Product[] = [
  { id: 1, name: "Бархатная Роза", price: 89.99, image: "🌹", rating: 4.8, reviews: 156, category: "Женщины", isNew: true },
  { id: 2, name: "Океанский Бриз", price: 75.00, image: "🌊", rating: 4.6, reviews: 203, category: "Мужчины", isNew: true },
  { id: 3, name: "Полночный Нуар", price: 95.00, image: "🌙", rating: 4.9, reviews: 189, category: "Унисекс", isNew: true },
  { id: 4, name: "Золотой Амбер", price: 120.00, image: "✨", rating: 5.0, reviews: 142, category: "Люкс", isNew: true }
];
const HIT_PRODUCTS: Product[] = [
  { id: 5, name: "Вишневый Цвет", price: 82.00, image: "🌸", rating: 4.7, reviews: 312, discount: 15 },
  { id: 6, name: "Дикий Лес", price: 68.00, image: "🌲", rating: 4.5, reviews: 267, discount: 10 },
  { id: 7, name: "Ванильные Мечты", price: 92.00, image: "🍦", rating: 4.9, reviews: 421, discount: 20 }
];
const SECOND_PERFUME: Product[] = [
  { id: 8, name: "Цитрусовая Искра", price: 65.00, image: "🍊", rating: 4.6, reviews: 198 },
  { id: 9, name: "Лавандовая Мгла", price: 70.00, image: "💜", rating: 4.8, reviews: 234 },
  { id: 10, name: "Пряный Уд", price: 110.00, image: "🔥", rating: 4.7, reviews: 167 },
  { id: 11, name: "Белый Чай", price: 78.00, image: "🍵", rating: 4.5, reviews: 145 }
];


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* GraphQL Demo */}
        <GraphQLDemo />
        
        {/* Promo Products */}
        <section id="promo" className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Акции</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SALE_PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} showDiscount={true}  />
            ))}
          </div>
        </section>
        
        {/* New Products */}
        <section id="new" className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Новинки</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NEW_PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Promotion */}
        
        {/* Catalog Categories */}
        {/* <section id="catalog" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Покупка по категориям</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section> */}

        {/* Hit Products */}
        <section id="sale" className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Лучшие хиты</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HIT_PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} showDiscount={true} />
            ))}
          </div>
        </section>
        
        {/* Second Perfume Recommendations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Вам может понравится</h2>
          {/* <p className="text-gray-600 mb-6">Complete your collection</p> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SECOND_PERFUME.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
