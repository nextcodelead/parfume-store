'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { X, Sparkles, Layers, Tag, ShieldCheck } from 'lucide-react';
import Button from '../Button';
import Input from './Input';
import Textarea from './Textarea';
import { ProductFormData } from '../../types/product';
import CategorySelect from '../CategoriesMenu/CategorySelect';
import BrandSelect from '../CategoriesMenu/BrandSelect';
import { useAddProduct, useProduct, useUpdateProduct } from '@/app/hooks/useProducts';
import SexSelect from '../CategoriesMenu/SexSelect';

type ProductQueryData = {
  product: {
    name: string;
    categoryId: number | null;
    brandId: number | null;
    description: string;
    index: number;
    isPublished: boolean;
    aromNote: string | null;
    sex: string;
    showAtMain: boolean;
  };
};

interface AddProductModalProps {
  isOpen: boolean;
  productId: number | null;
  onClose: () => void;
  onSubmit: (productData: ProductFormData) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, productId, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    categoryId: null,
    brandId: null,
    description: '',
    index: 1,
    isPublished: true,
    aromNote: '',
    sex: 'GENERAL',
    showAtMain: false,
  });

  const { data, error: productError } = useProduct(productId);
  const productDetails = (data as ProductQueryData | undefined)?.product;

  useEffect(() => {
    if (productDetails) {
      const p = productDetails;
      setFormData({
        name: p.name,
        categoryId: p.categoryId,
        brandId: p.brandId,
        description: p.description,
        index: p.index,
        isPublished: p.isPublished,
        aromNote: p.aromNote ?? '',
        sex: p.sex,
        showAtMain: p.showAtMain,
      });
    }
  }, [productDetails]);

  const [addProduct, { loading: adding, error }] = useAddProduct();
  const [updateProduct, { loading: updating }] = useUpdateProduct();

  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if(productId == null) {
        const result = await addProduct({ variables: { input: formData } });
        const addedProduct = (result.data as { addProduct: { pk: number } } | undefined)?.addProduct;
        console.log('✅ Добавлено:', addedProduct);
      } else {
        await updateProduct({
          variables: {
            pk: productId,
            input: formData
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 backdrop-blur p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-start justify-between bg-gradient-to-r from-rose-50 to-white">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-rose-500 font-semibold mb-1 flex items-center gap-2">
              <Sparkles size={14} />
              {productId ? 'Редактирование' : 'Новый продукт'}
            </p>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
              {productId ? 'Обновите карточку товара' : 'Создайте карточку товара'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Заполните основные данные, чтобы товар сразу появился в каталоге.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
            aria-label="Закрыть модальное окно"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 space-y-4 sm:space-y-6">
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold uppercase tracking-wide">
              <Tag size={16} className="text-rose-500" />
              Основная информация
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Название товара"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <div className="grid grid-cols-1 gap-4 md:gap-2">
                <CategorySelect
                  value={formData.categoryId}
                  onChange={(value) => setFormData({ ...formData, categoryId: value })}
                  excludes={[]}
                />
                <BrandSelect
                  value={formData.brandId}
                  onChange={(value) => setFormData({ ...formData, brandId: value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Textarea
                label="Описание"
                required
                value={formData.description ?? ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <Textarea
                label="Верхние ноты аромата"
                required
                value={formData.aromNote ?? ''}
                onChange={(e) => setFormData({ ...formData, aromNote: e.target.value })}
              />
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-5">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold uppercase tracking-wide">
              <Layers size={16} className="text-rose-500" />
              Каталогизация
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                label="Порядок отображения"
                type="number"
                required
                value={String(formData.index ?? '0')}
                onChange={(e) => setFormData({ ...formData, index: Number(e.target.value) })}
              />
              <SexSelect
                value={formData.sex ?? null}
                onChange={(value) => setFormData({ ...formData, sex: value })}
              />
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex flex-col gap-2">
                <span className="text-xs uppercase text-rose-500 font-semibold tracking-widest">
                  Видимость
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Показать на главной</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, showAtMain: !formData.showAtMain })}
                    className={`w-14 h-8 rounded-full transition ${
                      formData.showAtMain ? 'bg-rose-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`block w-7 h-7 bg-white rounded-full shadow transform transition ${
                        formData.showAtMain ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-5">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold uppercase tracking-wide">
              <ShieldCheck size={16} className="text-rose-500" />
              Публикация
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-100 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Опубликовано</p>
                  <p className="text-sm text-gray-500">Товар будет виден покупателям</p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  />
                  <span
                    className={`w-14 h-8 rounded-full transition ${
                      formData.isPublished ? 'bg-emerald-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`block w-7 h-7 bg-white rounded-full shadow transform transition ${
                        formData.isPublished ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </span>
                </label>
              </div>

              <div className="border border-gray-100 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">Последняя версия</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Изменения сохраняются автоматически после отправки</li>
                  <li>• Можно отредактировать позже в карточке товара</li>
                  {productError && (
                    <li className="text-rose-500">Ошибка загрузки товара: {productError.message}</li>
                  )}
                </ul>
              </div>
            </div>
          </section>

          {error && (
            <div className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg p-3">
              Ошибка при сохранении. Попробуйте ещё раз.
            </div>
          )}

          <div className="flex flex-wrap gap-3 justify-end pt-2">
            <Button variant="outline" onClick={onClose} disabled={adding} type="button">
              Отмена
            </Button>
            <Button variant="primary" type="submit" disabled={adding || updating}>
              {productId != null
                ? updating
                  ? 'Сохраняем изменения...'
                  : 'Обновить товар'
                : adding
                  ? 'Создаём товар...'
                  : 'Создать товар'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
