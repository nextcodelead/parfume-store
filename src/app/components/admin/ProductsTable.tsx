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

  const [deleteProduct] = useDeleteProduct();

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
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Товары</h2>
          <Button 
            variant="primary" 
            leftIcon={<Plus size={18} className="sm:w-5 sm:h-5" />}
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto"
          >
            <span className="text-sm sm:text-base">Добавить товар</span>
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 sm:pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm sm:text-base"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm sm:text-base"
          >
            <option value="all">Все статусы</option>
            <option value="active">Активные</option>
            <option value="draft">Черновики</option>
            <option value="outofstock">Нет в наличии</option>
          </select>
          <Button variant="outline" leftIcon={<Download size={18} className="sm:w-5 sm:h-5" />} className="text-sm sm:text-base">
            <span className="hidden sm:inline">Экспорт</span>
            <span className="sm:hidden">Экспорт</span>
          </Button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Товар</th>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Категория</th>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Остаток</th>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Продажи</th>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Статус</th>
              <th className="px-4 xl:px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading && <tr><td colSpan={6} className="text-center py-8 text-gray-600">Загрузка...</td></tr>}
            {error && <tr><td colSpan={6} className="text-center py-8 text-red-600">Ошибка загрузки</td></tr>}
            {data?.products.map((product) => (
              <tr key={product.pk} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 xl:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 xl:w-12 xl:h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {product.photo?.imageUrl ? 
                      <img src={`https://dataset.uz/${product.photo.imageUrl}`} alt={`Product ${product.pk}`} className="w-full h-full object-cover" /> : <span className="text-xl xl:text-2xl">🌹</span>}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm xl:text-base truncate">{product.name}</p>
                      <p className="text-xs xl:text-sm text-gray-600">ID: {product.pk}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 xl:px-6 py-4 text-gray-700 text-sm xl:text-base">{product.category.name}</td>
                <td className="px-4 xl:px-6 py-4">
                  <span className={`font-semibold text-sm xl:text-base ${product.count === 0 ? 'text-red-600' : product.count < 20 ? 'text-orange-600' : 'text-green-600'}`}>
                    {product.count}
                  </span>
                </td>
                <td className="px-4 xl:px-6 py-4 text-gray-700 text-sm xl:text-base">{product.countCells}</td>
                <td className="px-4 xl:px-6 py-4">{getStatusBadge(product.status)}</td>
                <td className="px-4 xl:px-6 py-4">
                  <div className="flex items-center justify-end gap-1 xl:gap-2">
                    <button className="p-1.5 xl:p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" onClick={() => {
                      setSelectedProductId(product.pk);
                      setIsUploadImageModalOpen(true);
                    }} aria-label="Загрузить изображение">
                      <Upload size={16} className="xl:w-[18px] xl:h-[18px]" />
                    </button>
                    <button className="p-1.5 xl:p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" onClick={() => {
                      setSelectedProductId(product.pk);
                      setIsUpdateStockModalOpen(true);
                    }} aria-label="Настройки склада">
                      <Settings size={16} className="xl:w-[18px] xl:h-[18px]" />
                    </button>
                    <button className="p-1.5 xl:p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" aria-label="Просмотр">
                      <Eye size={16} className="xl:w-[18px] xl:h-[18px]" />
                    </button>
                    <button className="p-1.5 xl:p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors" onClick={()=>{
                      setSelectedProductId(product.pk);
                      setIsAddModalOpen(true);
                    }} aria-label="Редактировать">
                      <Edit size={16} className="xl:w-[18px] xl:h-[18px]" />
                    </button>
                    <button className="p-1.5 xl:p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors" onClick={async () => {
                      if(confirm('Вы уверены, что хотите удалить этот товар?')) {
                        try {
                          await deleteProduct({ variables: { pk: product.pk } });
                          refetch();
                        } catch (err) {
                          console.error('❌ Ошибка удаления:', err);
                        }
                      }
                    }} aria-label="Удалить">
                      <Trash2 size={16} className="xl:w-[18px] xl:h-[18px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-4">
        {loading && <div className="text-center py-8 text-gray-600">Загрузка...</div>}
        {error && <div className="text-center py-8 text-red-600">Ошибка загрузки</div>}
        {data?.products.map((product) => (
          <div key={product.pk} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex gap-3 mb-3">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                {product.photo?.imageUrl ? 
                <img src={`https://dataset.uz/${product.photo.imageUrl}`} alt={`Product ${product.pk}`} className="w-full h-full object-cover" /> : <span className="text-2xl">🌹</span>}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-2">ID: {product.pk}</p>
                <p className="text-xs text-gray-700">{product.category.name}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-3 pt-3 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-600 mb-1">Остаток</p>
                <span className={`font-semibold text-sm ${product.count === 0 ? 'text-red-600' : product.count < 20 ? 'text-orange-600' : 'text-green-600'}`}>
                  {product.count}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Продажи</p>
                <span className="font-semibold text-sm text-gray-900">{product.countCells}</span>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Статус</p>
                {getStatusBadge(product.status)}
              </div>
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-200">
              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs hover:bg-gray-50 transition-colors" onClick={() => {
                setSelectedProductId(product.pk);
                setIsUploadImageModalOpen(true);
              }}>
                <Upload size={14} />
                <span>Изображение</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs hover:bg-gray-50 transition-colors" onClick={() => {
                setSelectedProductId(product.pk);
                setIsUpdateStockModalOpen(true);
              }}>
                <Settings size={14} />
                <span>Склад</span>
              </button>
              <button className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" onClick={()=>{
                setSelectedProductId(product.pk);
                setIsAddModalOpen(true);
              }} aria-label="Редактировать">
                <Edit size={14} className="text-blue-600" />
              </button>
              <button className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" onClick={async () => {
                if(confirm('Удалить товар?')) {
                  try {
                    await deleteProduct({ variables: { pk: product.pk } });
                    refetch();
                  } catch (err) {
                    console.error('Ошибка удаления:', err);
                  }
                }
              }} aria-label="Удалить">
                <Trash2 size={14} className="text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        {errorProductsCount && <p className="text-sm text-red-600">Ошибка загрузки количества товаров</p>}

        {!loadingProductsCount && dataProductsCount?.productsCount != null ? (
          <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
            Показано {currentPage * 5 + 1}-
            {Math.min((currentPage + 1) * 5, dataProductsCount.productsCount)} из{" "}
            {dataProductsCount.productsCount} товаров
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-gray-600">Загрузка количества товаров…</p>
        )}
        
        <div className="flex gap-2 flex-wrap justify-center">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} className="text-xs sm:text-sm">
            Назад
          </Button>
          <Button variant={currentPage === 0 ? "primary" : "outline"} size="sm" onClick={() => setCurrentPage(0)} className="text-xs sm:text-sm">
            1
          </Button>
          <Button variant={currentPage === 1 ? "primary" : "outline"} size="sm" onClick={() => setCurrentPage(1)} className="text-xs sm:text-sm">
            2
          </Button>
          <Button variant={currentPage === 2 ? "primary" : "outline"} size="sm" onClick={() => setCurrentPage(2)} className="text-xs sm:text-sm">
            3
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => prev + 1)} className="text-xs sm:text-sm">
            Далее
          </Button>
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
        isOpen={isUpdateStockModalOpen}
        onClose={() => { setIsUpdateStockModalOpen(false); setSelectedProductId(null); }}
        productId={selectedProductId!}
      />
    </div>
  );
};

export default ProductsTable;