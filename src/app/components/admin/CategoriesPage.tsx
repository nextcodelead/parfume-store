import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, X, Tag, FileText, Check, Layers } from 'lucide-react';
import { useAddCategory, useDeleteCategory, useMainCategories, useUpdateCategory } from '@/app/hooks/useCategories';
import CategorySelect from '../CategoriesMenu/CategorySelect';

// ============================================
// TYPES
// ============================================

type Category = {
  pk: number;
  name: string;
  description?: string | null;
  parentId?: number | null;
};

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
    primary: 'bg-purple-600 hover:bg-purple-700 text-white',
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
              : 'border-gray-300 focus:ring-purple-500'
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
// TEXTAREA COMPONENT
// ============================================

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <textarea
        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:ring-purple-500'
        } ${className}`}
        {...props}
      />
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
// CATEGORY CARD COMPONENT
// ============================================

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (pk: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onDelete }) => {
  const icons = ['🌹', '👔', '✨', '👑', '🎨', '💐', '🌸', '🔥'];
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-4 sm:p-6 border border-gray-200 hover:border-purple-300 group">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
              {randomIcon}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate">{category.name}</h3>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 mt-1">
                <Tag size={12} className="sm:w-3.5 sm:h-3.5" />
                {/* <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs sm:text-sm">{category.slug}</span> */}
              </div>
            </div>
            {(category.parentId) && (
              <div className="ml-auto text-sm text-gray-500 italic">
                Подкатегория
              </div>
            )}
          </div>
          
          {category.description && (
            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{category.description}</p>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 pt-3 sm:pt-4 border-t opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Edit2 size={16} />}
          onClick={() => onEdit(category)}
          className="flex-1"
        >
          Редактировать
        </Button>
        <Button
          variant="danger"
          size="sm"
          leftIcon={<Trash2 size={16} />}
          onClick={() => onDelete(category.pk)}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};

// ============================================
// CATEGORY FORM
// ============================================

interface CategoryFormProps {
  form: { pk: number | null; name: string; description?: string | null; parentId?: number | null };
  onChange: (field: string, value: string | number | null) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ form, onChange, onSave, onCancel, isEditing }) => {
  return (
    <div className="space-y-4">
      <Input
        label="Название категории"
        placeholder="Введите название категории"
        value={form.name}
        onChange={(e) => onChange('name', e.target.value)}
        leftIcon={<Layers size={18} />}
      />
      
      <Textarea
        label="Описание"
        placeholder="Краткое описание категории..."
        value={form.description!}
        onChange={(e) => onChange('description', e.target.value)}
        rows={4}
      />
      <CategorySelect
      canClear={true}
        excludes={[form.pk!]}
        value={form.parentId ?? null}
        onChange={(value) => onChange('parentId', value)} />

      <div className="flex gap-3 pt-4">
        <Button
          variant="primary"
          leftIcon={<Check size={18} />}
          onClick={onSave}
          className="flex-1"
        >
          {isEditing ? 'Сохранить изменения' : 'Добавить категорию'}
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
// MAIN CATEGORIES PAGE
// ============================================

export default function CategoriesPage() {
  const {data, loading, error} = useMainCategories();
  const [addCategory, {data: addCategoryData, loading: addCategoryLoading, error: addCategoryError}] = useAddCategory();
  const [deleteCategory, {data: deleteCategoryData, loading: deleteCategoryLoading, error: deleteCategoryError}] = useDeleteCategory();
  const [updateCategory, {data: updateCategoryData, loading: updateCategoryLoading, error: updateCategoryError}] = useUpdateCategory();
  const [items, setItems] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<Category>({ name: '' } as Category);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    if (data && data.categories) {
      setItems(data.categories);
    }
  }, [data]);

  const openAdd = async () => {
    setForm({ name: '', description: '', parentId: null } as Category);
    setEditing(null);
    setIsModalOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditing(category);
    setForm(category);
    setIsModalOpen(true);
  };

  const handleFormChange = (field: string, value: string | number | null) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      alert('Введите название категории');
      return;
    }

    if (editing) {
      await updateCategory({ variables: { pk: editing.pk, input: { name: form.name, description: form.description, parentId: form.parentId } } });
      setItems(prev => prev.map(c => c.pk === editing.pk ? { ...c, ...form } : c));
    } else {
      const res = await addCategory({ variables: { input: { name: form.name, description: form.description, parentId: form.parentId } } });
      const newCategory: Category = {
        pk: (res.data as { addCategory?: { pk: number } } | undefined)?.addCategory?.pk || Date.now(),
        name: form.name,
        description: form.description,
        parentId: form.parentId,
      };
      setItems(prev => [newCategory, ...prev]);
    }
    
    setIsModalOpen(false);
    setEditing(null);
    setForm({ name: '', description: null, parentId: null } as Category);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditing(null);
    setForm({ name: '', description: null, parentId: null } as Category);
  };

  const handleDelete = async (pk: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту категорию?')) return;
    await deleteCategory({ variables: { pk: pk } });
    setItems(prev => prev.filter(c => c.pk !== pk));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Управление категориями</h1>
          <p className="text-sm sm:text-base text-gray-600">Организуйте товары по категориям</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <p className="text-purple-100 mb-1 text-xs sm:text-sm">Всего категорий</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{items.length}</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <p className="text-pink-100 mb-1 text-xs sm:text-sm">С описанием</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{items.filter(c => c.description).length}</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <p className="text-indigo-100 mb-1 text-xs sm:text-sm">Без описания</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{items.filter(c => !c.description).length}</p>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 sm:gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Поиск категорий..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  viewMode === 'grid' 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Сетка
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  viewMode === 'table' 
                    ? 'bg-purple-100 text-purple-600' 
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
              <span className="text-sm sm:text-base">Добавить категорию</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        {!items || items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {searchTerm ? 'Категории не найдены' : 'Нет категорий'}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              {searchTerm 
                ? 'Попробуйте изменить поисковый запрос'
                : 'Начните с добавления первой категории'
              }
            </p>
            {!searchTerm && (
              <Button variant="primary" leftIcon={<Plus size={18} className="sm:w-5 sm:h-5" />} onClick={openAdd} size="md">
                Добавить первую категорию
              </Button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(category => (
              <CategoryCard
                key={category.pk}
                category={category}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Название</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Slug</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase hidden md:table-cell">Описание</th>
                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map(category => (
                    <tr key={category.pk} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-4">
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">{category.name}</div>
                        <div className="text-xs text-gray-600 md:hidden mt-1">{category.description || <span className="text-gray-400">—</span>}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className="bg-purple-100 text-purple-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                          {/* {category.slug} */}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                        <span className="text-gray-700 text-sm">
                          {category.description || <span className="text-gray-400">—</span>}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <button
                            onClick={() => openEdit(category)}
                            className="p-1.5 sm:p-2 hover:bg-purple-100 rounded-lg text-purple-600 transition-colors"
                            aria-label="Редактировать"
                          >
                            <Edit2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                          <button
                            onClick={() => handleDelete(category.pk)}
                            className="p-1.5 sm:p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                            aria-label="Удалить"
                          >
                            <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCancel}
          title={editing ? 'Редактировать категорию' : 'Добавить новую категорию'}
        >
          <CategoryForm
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