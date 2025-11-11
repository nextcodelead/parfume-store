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
    ProductFormData & { images?: string[]; files?: File[]; quantity?: string }
  >({
    name: '',
    article: '',
    discount: 0,
    categoryId: null,
    brandId: null,
    cost: null,
    description: '',
    volume: '',
    quantity: '0',
    images: [null, null, null, null], // 4 фото
    files: [null, null, null, null],
  });

  const [addProduct, { loading: adding, error }] = useAddProduct();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleFileChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    const newFiles = [...(formData.files ?? [])];
    const newImages = [...(formData.images ?? [])];

    newFiles[index] = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        newImages[index] = reader.result as string;
        setFormData({ ...formData, files: newFiles, images: newImages });
      };
      reader.readAsDataURL(file);
    } else {
      newImages[index] = null;
      setFormData({ ...formData, files: newFiles, images: newImages });
    }
  };

  const sanitizeInput = (data: typeof formData) => {
    const input: any = {};
    if (data.name) input.name = data.name;
    if (data.article) input.article = data.article;
    input.discount = data.discount ?? 0;
    if (data.categoryId != null) input.categoryId = data.categoryId;
    if (data.brandId != null) input.brandId = data.brandId;
    if (data.cost != null) input.cost = data.cost;
    if (data.description) input.description = data.description;
    if (data.volume != null) input.volume = data.volume;
    if (data.quantity) input.quantity = Number(data.quantity);
    if (data.images) input.images = data.images.filter(Boolean); // убираем null
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

          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Фотографии</label>
              <div className="flex gap-2">
                {(formData.images ?? []).map((img, i) => (
                  <div key={i} className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange(i)}
                      className="block w-20 h-20 opacity-0 absolute top-0 left-0 cursor-pointer"
                    />
                    <div
                      className={`w-20 h-20 border rounded flex items-center justify-center cursor-pointer ${
                        activeImageIndex === i ? 'border-blue-500' : 'border-gray-300'
                      }`}
                      onClick={() => setActiveImageIndex(i)}
                    >
                      {img ? <img src={img} alt={`preview-${i}`} className="w-full h-full object-cover rounded" /> : <span>+</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Количество"
              type="number"
              required
              value={formData.quantity ?? '0'}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />


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
