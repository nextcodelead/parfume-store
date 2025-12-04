'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Download, Upload, Settings, ChevronDown, ChevronUp, Filter } from 'lucide-react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);
  
  const { data, loading, error, refetch } = useAdminProducts(searchTerm, currentPage);
  const { data: dataProductsCount, loading: loadingProductsCount, error: errorProductsCount } = useAdminProductsCount(searchTerm);

  const [deleteProduct, { loading: deleting, error: deleteError }] = useDeleteProduct();

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const toggleProductExpand = (productId: number) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  // Десктопная версия таблицы
  const DesktopTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1024px]">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Товар</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Категория</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Остаток</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Продажи</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Статус</th>
            <th className="px-4 md:px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Действия</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading && (
            <tr>
              <td colSpan={6} className="text-center py-4">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-rose-600"></div>
                </div>
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-red-600">
                Ошибка загрузки
              </td>
            </tr>
          )}
          {data?.products.map((product) => (
            <tr key={product.pk} className="hover:bg-gray-50">
              <td className="px-4 md:px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {product.photo?.imageUrl ? 
                      <img 
                        src={`https://dataset.uz/${product.photo.imageUrl}`} 
                        alt={`Product Image ${product.pk}`} 
                        className="w-full h-full object-cover"
                      /> : 
                      <span className="text-lg md:text-2xl">🌹</span>
                    }
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm md:text-base line-clamp-1">{product.name}</p>
                    <p className="text-xs md:text-sm text-gray-600">ID: {product.pk}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base">{product.category.name}</td>
              <td className="px-4 md:px-6 py-4">
                <span className={`font-semibold text-sm md:text-base ${product.count === 0 ? 'text-red-600' : product.count < 20 ? 'text-orange-600' : 'text-green-600'}`}>
                  {product.count}
                </span>
              </td>
              <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base">{product.countCells}</td>
              <td className="px-4 md:px-6 py-4">{getStatusBadge(product.status)}</td>
              <td className="px-4 md:px-6 py-4">
                <div className="flex items-center justify-end gap-1 md:gap-2">
                  <button 
                    className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                    title="Загрузить фото"
                    onClick={() => {
                      setSelectedProductId(product.pk);
                      setIsUploadImageModalOpen(true);
                    }}
                  >
                    <Upload size={16} />
                  </button>
                  <button 
                    className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                    title="Настройки"
                    onClick={() => {
                      setSelectedProductId(product.pk);
                      setIsUpdateStockModalOpen(true);
                    }}
                  >
                    <Settings size={16} />
                  </button>
                  <button 
                    className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                    title="Просмотр"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="p-1.5 md:p-2 hover:bg-blue-100 rounded-lg text-blue-600"
                    title="Редактировать"
                    onClick={() => {
                      setSelectedProductId(product.pk);
                      setIsAddModalOpen(true);
                    }}
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="p-1.5 md:p-2 hover:bg-red-100 rounded-lg text-red-600"
                    title="Удалить"
                    onClick={async () => {
                      if(confirm('Вы уверены, что хотите удалить этот товар?')) {
                        try {
                          await deleteProduct({ variables: { pk: product.pk } });
                          refetch();
                        } catch (err) {
                          console.error('❌ Ошибка удаления:', err);
                        }
                      }
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Мобильная версия карточек
  const MobileCards = () => (
    <div className="space-y-3 p-4">
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
        </div>
      )}
      
      {error && (
        <div className="text-center py-4 text-red-600 bg-red-50 rounded-lg">
          Ошибка загрузки товаров
        </div>
      )}

      {data?.products.map((product) => (
        <div key={product.pk} className="bg-gray-50 rounded-lg p-4">
          {/* Заголовок карточки */}
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleProductExpand(product.pk)}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {product.photo?.imageUrl ? 
                  <img 
                    src={`https://dataset.uz/${product.photo.imageUrl}`} 
                    alt={`Product Image ${product.pk}`} 
                    className="w-full h-full object-cover"
                  /> : 
                  <span className="text-2xl">🌹</span>
                }
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm line-clamp-1">{product.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusBadge(product.status)}
                  <span className={`text-xs font-semibold ${product.count === 0 ? 'text-red-600' : product.count < 20 ? 'text-orange-600' : 'text-green-600'}`}>
                    {product.count} шт
                  </span>
                </div>
              </div>
            </div>
            <button className="p-1">
              {expandedProduct === product.pk ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {/* Раскрывающееся содержимое */}
          {expandedProduct === product.pk && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500">Категория</p>
                  <p className="text-sm font-medium">{product.category.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Продажи</p>
                  <p className="text-sm font-medium">{product.countCells}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ID товара</p>
                  <p className="text-sm font-medium">{product.pk}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Остаток</p>
                  <p className="text-sm font-semibold">{product.count} шт</p>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <button 
                  className="flex-1 flex flex-col items-center justify-center p-2 bg-white border border-gray-300 rounded-lg"
                  onClick={() => {
                    setSelectedProductId(product.pk);
                    setIsUploadImageModalOpen(true);
                  }}
                >
                  <Upload size={16} />
                  <span className="text-xs mt-1">Фото</span>
                </button>
                <button 
                  className="flex-1 flex flex-col items-center justify-center p-2 bg-white border border-gray-300 rounded-lg"
                  onClick={() => {
                    setSelectedProductId(product.pk);
                    setIsUpdateStockModalOpen(true);
                  }}
                >
                  <Settings size={16} />
                  <span className="text-xs mt-1">Сток</span>
                </button>
                <button 
                  className="flex-1 flex flex-col items-center justify-center p-2 bg-white border border-gray-300 rounded-lg"
                >
                  <Eye size={16} />
                  <span className="text-xs mt-1">Просмотр</span>
                </button>
                <button 
                  className="flex-1 flex flex-col items-center justify-center p-2 bg-white border border-blue-300 rounded-lg"
                  onClick={() => {
                    setSelectedProductId(product.pk);
                    setIsAddModalOpen(true);
                  }}
                >
                  <Edit size={16} className="text-blue-600" />
                  <span className="text-xs mt-1 text-blue-600">Редакт.</span>
                </button>
                <button 
                  className="flex-1 flex flex-col items-center justify-center p-2 bg-white border border-red-300 rounded-lg"
                  onClick={async () => {
                    if(confirm('Удалить товар?')) {
                      try {
                        await deleteProduct({ variables: { pk: product.pk } });
                        refetch();
                      } catch (err) {
                        console.error('❌ Ошибка:', err);
                      }
                    }
                  }}
                >
                  <Trash2 size={16} className="text-red-600" />
                  <span className="text-xs mt-1 text-red-600">Удалить</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Товары</h2>
          <Button 
            variant="primary" 
            size={isMobile ? "sm" : "default"}
            leftIcon={<Plus size={isMobile ? 16 : 20} />}
            onClick={() => setIsAddModalOpen(true)}
            className="w-full md:w-auto"
          >
            Добавить товар
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm md:text-base"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
            >
              <option value="all">Все статусы</option>
              <option value="active">Активные</option>
              <option value="draft">Черновики</option>
              <option value="outofstock">Нет в наличии</option>
            </select>
            <Button 
              variant="outline" 
              size="sm" 
              leftIcon={<Download size={16} />}
              className="whitespace-nowrap"
            >
              <span className="hidden sm:inline">Экспорт</span>
              <span className="sm:hidden">Export</span>
            </Button>
            {isMobile && (
              <Button 
                variant="outline" 
                size="sm" 
                leftIcon={<Filter size={16} />}
                className="whitespace-nowrap"
              >
                Фильтры
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table/Cards */}
      <div className="hidden md:block">
        <DesktopTable />
      </div>
      <div className="md:hidden">
        <MobileCards />
      </div>

      {/* Pagination */}
      <div className="p-4 md:p-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {errorProductsCount && (
            <p className="text-sm text-red-600">Ошибка загрузки количества</p>
          )}

          {!loadingProductsCount && dataProductsCount?.productsCount != null ? (
            <p className="text-sm text-gray-600">
              Показано {currentPage * 5 + 1}-
              {Math.min((currentPage + 1) * 5, dataProductsCount.productsCount)} из{" "}
              {dataProductsCount.productsCount} товаров
            </p>
          ) : (
            <p className="text-sm text-gray-600">Загрузка...</p>
          )}
          
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs px-2"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            >
              Назад
            </Button>
            {[0, 1, 2].map((pageNum) => (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "primary" : "outline"}
                size="sm"
                className="text-xs px-2 min-w-[32px]"
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum + 1}
              </Button>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs px-2"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Далее
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={isAddModalOpen}
        productId={selectedProductId}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedProductId(null);
        }}
        onSubmit={handleAddProduct}
      />
      <UploadImageModal
        isOpen={isUploadImageModalOpen}
        onClose={() => {
          setIsUploadImageModalOpen(false);
          setSelectedProductId(null);
        }}
        productId={selectedProductId}
      />
      <UpdateStockModal
        isOpen={isUpdateStockModalOpen}
        onClose={() => { 
          setIsUpdateStockModalOpen(false); 
          setSelectedProductId(null); 
        }}
        productId={selectedProductId!}
      />
    </div>
  );
};

export default ProductsTable;