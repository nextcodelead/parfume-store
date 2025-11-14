import { StatItem, Product, Order, MenuItem } from '../types/admin';

export const STATS: StatItem[] = [
  { 
    id: 1, 
    title: 'Общая выручка', 
    value: '₽2,458,000', 
    change: '+12.5%', 
    trend: 'up',
    icon: 'dollarSign',
    color: 'bg-green-100 text-green-600'
  },
  { 
    id: 2, 
    title: 'Заказы', 
    value: '1,234', 
    change: '+8.3%', 
    trend: 'up',
    icon: 'shoppingCart',
    color: 'bg-blue-100 text-blue-600'
  },
  { 
    id: 3, 
    title: 'Клиенты', 
    value: '856', 
    change: '+15.2%', 
    trend: 'up',
    icon: 'users',
    color: 'bg-purple-100 text-purple-600'
  },
  { 
    id: 4, 
    title: 'Товары', 
    value: '342', 
    change: '-2.1%', 
    trend: 'down',
    icon: 'package',
    color: 'bg-orange-100 text-orange-600'
  }
];

export const PRODUCTS_DATA: Product[] = [
  { id: 1, name: 'Velvet Rose Eau de Parfum', category: 'Женские', price: 89.99, stock: 45, image: '🌹', status: 'active', sales: 156 },
  { id: 2, name: 'Ocean Breeze', category: 'Мужские', price: 75.00, stock: 23, image: '🌊', status: 'active', sales: 203 },
  { id: 3, name: 'Midnight Noir', category: 'Унисекс', price: 95.00, stock: 0, image: '🌙', status: 'outofstock', sales: 189 },
  { id: 4, name: 'Golden Amber', category: 'Люкс', price: 120.00, stock: 12, image: '✨', status: 'active', sales: 142 },
  { id: 5, name: 'Cherry Blossom', category: 'Женские', price: 82.00, stock: 67, image: '🌸', status: 'active', sales: 312 }
];

export const ORDERS_DATA: Order[] = [
  { id: '#ES-1001', customer: 'Анна Иванова', date: '2024-10-13', total: 89.99, status: 'pending', items: 1 },
  { id: '#ES-1002', customer: 'Дмитрий Петров', date: '2024-10-13', total: 225.00, status: 'processing', items: 3 },
  { id: '#ES-1003', customer: 'Елена Смирнова', date: '2024-10-12', total: 120.00, status: 'shipped', items: 1 },
  { id: '#ES-1004', customer: 'Михаил Козлов', date: '2024-10-12', total: 175.50, status: 'delivered', items: 2 },
  { id: '#ES-1005', customer: 'Ольга Соколова', date: '2024-10-11', total: 95.00, status: 'cancelled', items: 1 }
];

export const MENU_ITEMS: MenuItem[] = [
  { id: 'products', label: 'Товары', icon: 'package' },
  // { id: 'dashboard', label: 'Дашборд', icon: 'layoutDashboard' },
  // { id: 'orders', label: 'Заказы', icon: 'shoppingCart' },
  // { id: 'customers', label: 'Клиенты', icon: 'users' },
  // { id: 'analytics', label: 'Аналитика', icon: 'trendingUp' },
  // { id: 'settings', label: 'Настройки', icon: 'settings' }
];