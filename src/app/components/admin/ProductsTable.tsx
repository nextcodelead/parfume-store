'use client';

import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Download, Upload, Settings } from 'lucide-react';
import { ProductFormData } from '../../types/product';
import Button from '../Button';
import AddProductModal from './AddProductModal';
import { useAdminProducts, useAdminProductsCount } from '@/app/hooks/useCategories';
import UploadImageModal from './UploadImageModal';
import { useDeleteProduct } from '@/app/hooks/useProducts';
import UpdateStockModal from './UpdateStockModal';



const ProductsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateStockModalOpen, setIsUpdateStockModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isUploadImageModalOpen, setIsUploadImageModalOpen] = useState(false);
  const { data, loading, error, refetch } = useAdminProducts(searchTerm, currentPage);
  const { data: dataProductsCount, loading: loadingProductsCount, error: errorProductsCount } = useAdminProductsCount(searchTerm);
  const [deleteProduct, { loading: deleting, error: deleteError }] = useDeleteProduct();

  const handleAddProduct = (productData: ProductFormData) => {
    console.log('New product:', productData);
    refetch();
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      ACTIVE: 'bg-green-100 text-green-700',
      DRAFT: 'bg-gray-100 text-gray-700',
      OUT_OF_STOCK: 'bg-red-100 text-red-700'
    };
    const labels = {
      ACTIVE: 'Активен',
      DRAFT: 'Черновик',
      OUT_OF_STOCK: 'Нет в наличии'
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
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Остаток</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Продажи</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Статус</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading && <tr><td colSpan={7} className="text-center py-4">Загрузка...</td></tr>}
            {error && <tr><td colSpan={7} className="text-center py-4">Ошибка загрузки</td></tr>}
            {data && data.products.map((product) => (
              <tr key={product.pk} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {/* {product.image} */}
                      {product.photo?.imageUrl ? 
                      <img src={`https://dataset.uz/${product.photo.imageUrl}`} alt={`Product Image ${product.pk}`} width={80} height={80} className="object-cover rounded" /> : <span>🌹</span>}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">ID: {product.pk}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{product.category.name}</td>
                <td className="px-6 py-4">
                  <span className={`font-semibold ${product.count === 0 ? 'text-red-600' : product.count < 20 ? 'text-orange-600' : 'text-green-600'}`}>
                    {product.count}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{product.countCells}</td>
                <td className="px-6 py-4">{getStatusBadge(product.status)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" onClick={() => {
                      setSelectedProductId(product.pk);
                      setIsUploadImageModalOpen(true);
                    }}>
                      <Upload size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" onClick={() => {
                      setSelectedProductId(product.pk);
                      setIsUpdateStockModalOpen(true);
                    }}>
                      <Settings size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 hover:bg-blue-100 rounded-lg text-blue-600" onClick={()=>{
                      setSelectedProductId(product.pk);
                      setIsAddModalOpen(true);
                    }}>
                      <Edit size={18} />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg text-red-600" onClick={async () => {
                      if(confirm('Вы уверены, что хотите удалить этот товар?')) {
                        try {
                          await deleteProduct({ variables: { pk: product.pk } });
                          refetch();
                        } catch (err) {
                          console.error('❌ Ошибка удаления:', err);
                        }
                      }
                    }}>
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
        {errorProductsCount && <p>Ошибка загрузки количества товаров</p>}

        {/* безопасный рендер: либо есть числа — показываем корректно, иначе — нейтральный текст */}
        {!loadingProductsCount && dataProductsCount?.productsCount != null ? (
          <p className="text-sm text-gray-600">
            Показано {currentPage * 5 + 1}-
            {Math.min((currentPage + 1) * 5, dataProductsCount.productsCount)} из{" "}
            {dataProductsCount.productsCount} товаров
          </p>
        ) : (
          <p className="text-sm text-gray-600">Загрузка количества товаров…</p>
        )}
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}>Назад</Button>
          <Button variant="primary" size="sm" onClick={() => setCurrentPage(0)}>1</Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)}>2</Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(2)}>3</Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => prev + 1)}>Далее</Button>
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        productId={selectedProductId}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProduct}
      />
      <UploadImageModal
        isOpen={isUploadImageModalOpen}
        onClose={() => setIsUploadImageModalOpen(false)}
        productId={selectedProductId}
      />
      <UpdateStockModal
        isOpen={isUpdateStockModalOpen && selectedProductId !== null}
        onClose={() => setSelectedProductId(null)}
        productId={selectedProductId}
      />
    </div>
  );
};

export default ProductsTable;