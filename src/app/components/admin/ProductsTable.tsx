import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Download } from 'lucide-react';
import { Product } from '../../types/admin';
import { ProductFormData } from '../../types/product';
import { PRODUCTS_DATA } from '../../data/adminData';
import Button from '../Button';
import AddProductModal from './AddProductModal';

const ProductsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddProduct = (productData: ProductFormData) => {
    console.log('New product:', productData);
    // Здесь будет логика добавления продукта
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'bg-green-100 text-green-700',
      draft: 'bg-gray-100 text-gray-700',
      outofstock: 'bg-red-100 text-red-700'
    };
    const labels = {
      active: 'Активен',
      draft: 'Черновик',
      outofstock: 'Нет в наличии'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Товары</h2>
          <Button 
            variant="primary" 
            leftIcon={<Plus size={20} />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Добавить товар
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="all">Все статусы</option>
            <option value="active">Активные</option>
            <option value="draft">Черновики</option>
            <option value="outofstock">Нет в наличии</option>
          </select>
          <Button variant="outline" leftIcon={<Download size={20} />}>
            Экспорт
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Товар</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Категория</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Цена</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Остаток</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Продажи</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Статус</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {PRODUCTS_DATA.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {product.image}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">ID: {product.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{product.category}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">₽{product.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`font-semibold ${product.stock === 0 ? 'text-red-600' : product.stock < 20 ? 'text-orange-600' : 'text-green-600'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{product.sales}</td>
                <td className="px-6 py-4">{getStatusBadge(product.status)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 hover:bg-blue-100 rounded-lg text-blue-600">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">Показано 1-5 из 342 товаров</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Назад</Button>
          <Button variant="outline" size="sm">1</Button>
          <Button variant="primary" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Далее</Button>
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

export default ProductsTable;