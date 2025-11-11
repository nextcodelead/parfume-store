'use client';

import React, { FormEvent, useState } from 'react';
import { X } from 'lucide-react';
import Button from '../Button';
import Input from './Input';
import Textarea from './Textarea';
import { ProductFormData } from '../../types/product';
import CategorySelect from '../CategoriesMenu/CategorySelect';
import BrandSelect from '../CategoriesMenu/BrandSelect';
import { useAddProduct } from '@/app/hooks/useProducts';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: ProductFormData) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<
    ProductFormData & { image?: string | null; file?: File | null; quantity?: string }
  >({
    name: '',
    article: '',
    discount: 0,
    categoryId: null,
    brandId: null,
    cost: null,
    description: '',
    volume: null,
    image: null,
    file: null,
    quantity: '0',
  });

  const [addProduct, { loading: adding, error }] = useAddProduct();

  // Обработчик выбора файла: читаем как data URL для превью
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setFormData({ ...formData, file: null, image: null });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, file, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const sanitizeInput = (data: ProductFormData & { image?: string | null; quantity?: string }) => {
    const input: any = {};

    if (data.name) input.name = data.name;
    if (data.article) input.article = data.article;
    input.discount = data.discount ?? 0;
    if (data.categoryId !== null && data.categoryId !== undefined) input.categoryId = data.categoryId;
    if (data.brandId !== null && data.brandId !== undefined) input.brandId = data.brandId;
    if (data.cost !== null && data.cost !== undefined) input.cost = data.cost;
    if (data.description) input.description = data.description;
    if (data.volume !== null && data.volume !== undefined) input.volume = data.volume;
    if (data.quantity) input.quantity = Number(data.quantity);
    if (data.image) input.image = data.image;

    return input;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const input = sanitizeInput(formData);
      const result = await addProduct({ variables: { input } });
      console.log('✅ Добавлено:', result.data?.addProduct);

      onSubmit(formData);
      onClose();
    } catch (err) {
      console.error('❌ Ошибка добавления:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Добавить новый товар</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Название"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <CategorySelect
            value={formData.categoryId}
            onChange={(value) => setFormData({ ...formData, categoryId: value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Цена"
              type="number"
              required
              value={String(formData.discount ?? 0)}
              onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
            />
            <Input
              label="Старая цена"
              type="number"
              value={String(formData.cost ?? 0)}
              onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
            />
          </div>

          <Input
            label="Артикул"
            required
            value={formData.article}
            onChange={(e) => setFormData({ ...formData, article: e.target.value })}
          />

          <BrandSelect
            value={formData.brandId}
            onChange={(value) => setFormData({ ...formData, brandId: value })}
          />

          <Textarea
            label="Описание"
            required
            value={formData.description ?? ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Объем"
              required
              value={String(formData.volume ?? 0)}
              onChange={(e) => setFormData({ ...formData, volume: Number(e.target.value) })}
            />
          </div>

          {/* Новые поля: количество и изображение */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Количество"
              type="number"
              required
              value={formData.quantity ?? '0'}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Изображение</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="preview"
                  className="mt-2 h-24 w-24 object-cover rounded"
                />
              )}
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600">Ошибка при добавлении товара. Попробуйте ещё раз.</div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose} disabled={adding}>
              Отмена
            </Button>
            <Button variant="primary" type="submit" disabled={adding}>
              {adding ? 'Добавление...' : 'Добавить товар'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
