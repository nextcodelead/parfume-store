'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Button from '../Button';
import Input from './Input';
import Textarea from './Textarea';
import { ProductFormData } from '../../types/product';
import CategorySelect from '../CategoriesMenu/CategorySelect';
import BrandSelect from '../CategoriesMenu/BrandSelect';
import { useAddProduct, useProduct, useUpdateProduct } from '@/app/hooks/useProducts';
import SexSelect from '../CategoriesMenu/SexSelect';

interface AddProductModalProps {
  isOpen: boolean;
  productId: number | null;
  onClose: () => void;
  onSubmit: (productData: ProductFormData) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, productId, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<
    ProductFormData
  >({
    name: '',
    article: '',
    discount: 0,
    categoryId: null,
    brandId: null,
    cost: null,
    description: '',
    volume: 0,
    count: 0,
    index: 1,
    isPublished: true,
    aromNote: '',
    sex: 'GENERAL',
    weight: 0,
    unit: 'шт',
    size: '',
    showAtMain: false,
  });

  const { loading, data, error: productError } = useProduct(productId);
  useEffect(() => {
    if (data?.product) {
      const p = data.product;
      setFormData({
        name: p.name,
        article: p.article,
        discount: p.discount,
        categoryId: p.categoryId,
        brandId: p.brandId,
        cost: p.cost,
        description: p.description,
        volume: p.volume,
        count: p.count,
        index: p.index,
        isPublished: p.isPublished,
        aromNote: p.aromNote ?? '',
        sex: p.sex,
        weight: p.weight,
        unit: p.unit,
        size: p.size,
        showAtMain: p.showAtMain,
      });
    }
  }, [data]);

  const [addProduct, { loading: adding, error }] = useAddProduct();
  const [updateProduct, { loading: updating, error: updateError }] = useUpdateProduct();

  
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
    if (data.count) input.count = Number(data.count);
    return input;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if(productId == null) {
        const input = sanitizeInput(formData);
        const result = await addProduct({ variables: { input } });
        console.log('✅ Добавлено:', result.data?.addProduct);
      } else {
        await updateProduct({
          variables: {
            pk: productId,
            input: sanitizeInput(formData)
          }
        })
      }
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
          {productId != null ? (<h2 className="text-xl font-bold text-gray-900">Редактировать товар</h2>) : (
          <h2 className="text-xl font-bold text-gray-900">Добавить новый товар</h2>
          )}
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

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Количество"
              type="number"
              required
              value={String(formData.count ?? '0')}
              onChange={(e) => setFormData({ ...formData, count: Number(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Порядок отображения"
              type="number"
              required
              value={String(formData.index ?? '0')}
              onChange={(e) => setFormData({ ...formData, index: Number(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Вес"
              type="number"
              required
              value={String(formData.weight ?? '0')}
              onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Единица измерения"
              type="text"
              required
              value={formData.unit ?? 'шт'}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Размер"
              type="number"
              required
              value={formData.size ?? 'шт'}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SexSelect 
              value={formData.sex ?? null}
              onChange={(value) => setFormData({ ...formData, sex: value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label>
              <p>Опубликовать товар</p>
              <input type='checkbox' checked={formData.isPublished} onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })} />
            </label>
            <label>
              <p>Опубликовать на главной</p>
              <input type='checkbox' checked={formData.showAtMain} onChange={(e) => setFormData({ ...formData, showAtMain: e.target.checked })} />
            </label>
          </div>

          {error && (
            <div className="text-sm text-red-600">Ошибка при добавлении товара. Попробуйте ещё раз.</div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose} disabled={adding}>
              Отмена
            </Button>
            <Button variant="primary" type="submit" disabled={adding}>
              {productId != null ? (updating ? 'Обновление...' : 'Обновить товар') : (adding ? 'Добавление...' : 'Добавить товар')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
