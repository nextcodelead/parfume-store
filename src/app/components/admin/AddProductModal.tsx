'use client';

import React, { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { X } from 'lucide-react';
import Button from '../Button';
import Input from './Input';
import Textarea from './Textarea';
import { ProductFormData } from '../../types/product';
import { Product } from '../../types/graphql';
import { GET_PRODUCTS } from '../../graphql/queries';

const ADD_PRODUCT = gql`
  mutation AddProduct($input: ProductInput!) {
    addProduct(input: $input) {
      pk
      name
      article
      cost
      discount
    }
  }
`;

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: ProductFormData) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    article: '', // ← добавить
    discount: '0',
    price: '',
    oldPrice: '',
    description: '',
    volume: '',
    brand: '', // ← добавить (будет хранить pk бренда)
    category: '', // ← добавить (будет хранить pk категории)
    isPublished: true, // ← добавить
  });

  const [addProduct, { loading: adding, error: mutationError }] = useMutation(ADD_PRODUCT, {
    // Обновляем локальный кеш GET_PRODUCTS, чтобы новый товар отображался без перезагрузки
    update(cache, result) {
      const newProduct = (result as any)?.data?.addProduct;
      if (!newProduct) return;
      try {
        const existing = cache.readQuery({ query: GET_PRODUCTS }) as { products?: Product[] } | null;
        if (existing?.products) {
          cache.writeQuery({
            query: GET_PRODUCTS,
            data: { products: [newProduct, ...existing.products] },
          });
        } else {
          cache.writeQuery({
            query: GET_PRODUCTS,
            data: { products: [newProduct] },
          });
        }
      } catch (e) {
        console.warn('Cache update failed', e);
      }
    },
    onCompleted: () => {
      onClose();
    },
    onError: (err: unknown) => {
      console.error('Add product error:', err);
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      const input = {
      name: formData.name,
      article: formData.article,
      cost: formData.price ? parseFloat(formData.price) : 0,
      discount: formData.discount ? parseFloat(formData.discount) : 0,
      description: formData.description,
      volume: formData.volume ? parseFloat(formData.volume) : 0,
      brandId: formData.brand ? parseInt(formData.brand) : null,
      categoryId: formData.category ? parseInt(formData.category) : null,
      isPublished: formData.isPublished,
     };

    try {
      await addProduct({ variables: { input } });
      // Вызов колбека на случай, если компонент требует локальной обработки
      try {
        onSubmit({ ...formData });
      } catch {
        // ignore if parent handler not provided or fails
      }
      // onCompleted закроет модалку
    } catch {
      // Ошибка уже обработана в onError, можно показать сообщение
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Цена"
              type="number"
              required
              value={formData.price ?? ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, price: e.target.value })}
            />
            <Input
              label="Старая цена"
              type="number"
              value={formData.oldPrice ?? ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, oldPrice: e.target.value })}
            />
          </div>
          <Input
            label="Артикул"
            required
            value={formData.article}
            onChange={(e) => setFormData({ ...formData, article: e.target.value })}
          />

          <select 
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          >
            <option value="">Выберите бренд</option>
            {/* options из данных */}
          </select>


          <Textarea
            label="Описание"
            required
            value={formData.description ?? ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Объем"
              required
              value={formData.volume ?? ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, volume: e.target.value })}
            />
            <Input
              label="Категория (ID)"
              type="text"
              value={formData.category ?? ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          {mutationError && (
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