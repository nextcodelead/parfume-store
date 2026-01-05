import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Globe, Search, X, Tag, Check } from 'lucide-react';
import { useAddBrand, useAdminBrands, useDeleteBrand, useUpdateBrand } from '@/app/hooks/useBrands';

// ============================================
// TYPES
// ============================================

type Brand = {
  pk: number;
  name: string;
  siteUrl: string | null;
};
// ============================================
// BUTTON COMPONENT
// ============================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md';
  leftIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base'
  };

  return (
    <button
      className={`font-medium rounded-lg transition-all inline-flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {leftIcon && <span>{leftIcon}</span>}
      <span>{children}</span>
    </button>
  );
};

// ============================================
// INPUT COMPONENT
// ============================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, error, leftIcon, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-2.5 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          className={`w-full ${leftIcon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-blue-500'
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
};

// ============================================
// MODAL COMPONENT
// ============================================

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================
// BRAND CARD COMPONENT
// ============================================

interface BrandCardProps {
  brand: Brand;
  onEdit: (brand: Brand) => void;
  onDelete: (pk: number) => void;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-4 sm:p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 truncate">{brand.name}</h3>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-2">
            <Tag size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
            {/* <span className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm">{brand.slug}</span> */}
          </div>
          {brand.siteUrl && (
            <a
              href={brand.siteUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
            >
              <Globe size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{brand.siteUrl}</span>
            </a>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 pt-3 sm:pt-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Edit2 size={16} />}
          onClick={() => onEdit(brand)}
          className="flex-1"
        >
          Редактировать
        </Button>
        <Button
          variant="danger"
          size="sm"
          leftIcon={<Trash2 size={16} />}
          onClick={() => onDelete(brand.pk)}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};

// ============================================
// BRAND FORM
// ============================================

interface BrandFormProps {
  form: { name: string; siteUrl: string };
  onChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

const BrandForm: React.FC<BrandFormProps> = ({ form, onChange, onSave, onCancel, isEditing }) => {
  return (
    <div className="space-y-4">
      <Input
        label="Название бренда"
        placeholder="Введите название бренда"
        value={form.name}
        onChange={(e) => onChange('name', e.target.value)}
        leftIcon={<Tag size={18} />}
      />
    
      
      <Input
        label="Веб-сайт"
        placeholder="https://example.com"
        value={form.siteUrl}
        onChange={(e) => onChange('siteUrl', e.target.value)}
        leftIcon={<Globe size={18} />}
      />

      <div className="flex gap-3 pt-4">
        <Button
          variant="primary"
          leftIcon={<Check size={18} />}
          onClick={onSave}
          className="flex-1"
        >
          {isEditing ? 'Сохранить изменения' : 'Добавить бренд'}
        </Button>
        <Button
          variant="secondary"
          onClick={onCancel}
          leftIcon={<X size={18} />}
        >
          Отмена
        </Button>
      </div>
    </div>
  );
};

// ============================================
// MAIN BRANDS PAGE
// ============================================

export default function BrandsPage() {
  const {data, loading, error} = useAdminBrands();
  const [addBrand, {data: addBrandData, loading: addingBrand, error: addBrandError}] = useAddBrand();
  const [updateBrand, {data: updateBrandData, loading: updatingBrand, error: updateBrandError}] = useUpdateBrand();
  const [deleteBrand, {data: deleteBrandData, loading: deletingBrand, error: deleteBrandError}] = useDeleteBrand();
  const [items, setItems] = useState<Brand[]>(data?.brands || []);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', siteUrl: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    setItems(data?.brands || []);
  }, [data]);

  const openAdd = () => {
    setForm({ name: '', siteUrl: '' });
    setEditing(null);
    setIsModalOpen(true);
  };

  const openEdit = (brand: Brand) => {
    setEditing(brand);
    setForm({ name: brand.name, siteUrl: brand.siteUrl || '' });
    setIsModalOpen(true);
  };

  const handleFormChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      alert('Введите название бренда');
      return;
    }

    if (editing) {
      await updateBrand({ variables: { pk: editing.pk, input: { name: form.name, siteUrl: form.siteUrl || null } } })
      setItems(prev => prev.map(
        b => b.pk === editing.pk 
          ? { ...b, name: form.name, siteUrl: form.siteUrl || null } 
          : b
      ));
    } else {
      const res = await addBrand({ variables: { input: { name: form.name, siteUrl: form.siteUrl || null } } })
      const newBrand: Brand = {
        pk: res.data?.addBrand?.pk || Date.now(),
        name: form.name,
        siteUrl: form.siteUrl || null,
      };
      setItems(prev => [newBrand, ...prev]);
    }
    
    setIsModalOpen(false);
    setEditing(null);
    setForm({ name: '', siteUrl: '' });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditing(null);
    setForm({ name: '', siteUrl: '' });
  };

  const handleDelete = async (pk: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот бренд?')) return;
    await deleteBrand({ variables: { pk: pk } });
    setItems(prev => prev.filter(b => b.pk !== pk));
  };

  const filteredItems = data?.brands || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Управление брендами</h1>
          <p className="text-sm sm:text-base text-gray-600">Добавляйте и редактируйте бренды парфюмерии</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <p className="text-blue-100 mb-1 text-xs sm:text-sm">Всего брендов</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{items.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <p className="text-green-100 mb-1 text-xs sm:text-sm">С сайтом</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{items.filter(b => b.siteUrl).length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <p className="text-purple-100 mb-1 text-xs sm:text-sm">Без сайта</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{items.filter(b => !b.siteUrl).length}</p>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 sm:gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Поиск брендов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Сетка
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  viewMode === 'table' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Таблица
              </button>
            </div>

            <Button
              variant="primary"
              leftIcon={<Plus size={18} className="sm:w-5 sm:h-5" />}
              onClick={openAdd}
              className="w-full md:w-auto justify-center"
              size="md"
            >
              <span className="text-sm sm:text-base">Добавить бренд</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
            <div className="text-4xl sm:text-6xl mb-4">🏷️</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {searchTerm ? 'Бренды не найдены' : 'Нет брендов'}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              {searchTerm 
                ? 'Попробуйте изменить поисковый запрос'
                : 'Начните с добавления первого бренда'
              }
            </p>
            {!searchTerm && (
              <Button variant="primary" leftIcon={<Plus size={18} className="sm:w-5 sm:h-5" />} onClick={openAdd} size="md">
                Добавить первый бренд
              </Button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map(brand => (
              <BrandCard
                key={brand.pk}
                brand={brand}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Название</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Веб-сайт</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredItems.map(brand => (
                      <tr key={brand.pk} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{brand.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          {brand.website ? (
                            <a
                              href={brand.website}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                            >
                              <Globe size={16} />
                              <span className="truncate max-w-xs">{brand.website}</span>
                            </a>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEdit(brand)}
                              className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors"
                              aria-label="Редактировать"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(brand.id)}
                              className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                              aria-label="Удалить"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3 sm:space-y-4">
              {filteredItems.map(brand => (
                <div key={brand.id} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-2 truncate">{brand.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Tag size={14} className="text-gray-400 flex-shrink-0" />
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm text-gray-700">{brand.slug}</span>
                      </div>
                      {brand.website && (
                        <a
                          href={brand.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
                        >
                          <Globe size={14} className="flex-shrink-0" />
                          <span className="truncate">{brand.website}</span>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => openEdit(brand)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                      <Edit2 size={16} />
                      <span>Редактировать</span>
                    </button>
                    <button
                      onClick={() => handleDelete(brand.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                    >
                      <Trash2 size={16} />
                      <span>Удалить</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCancel}
          title={editing ? 'Редактировать бренд' : 'Добавить новый бренд'}
        >
          <BrandForm
            form={form}
            onChange={handleFormChange}
            onSave={handleSave}
            onCancel={handleCancel}
            isEditing={!!editing}
          />
        </Modal>
      </div>
    </div>
  );
}