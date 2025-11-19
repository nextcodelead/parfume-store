'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { Beaker, Gauge, Layers, PackagePlus, PoundSterling, Scale, X } from 'lucide-react';
import Button from '../Button';
import Input from './Input';
import { StockFormData } from '../../types/product';
import { useAddStock, useStock, useUpdateStock } from '@/app/hooks/useProducts';

interface AddStockModalProps {
  isOpen: boolean;
  productId: number;
  stockId: number | null;
  onClose: () => void;
  onSubmit: (stockData: StockFormData) => void;
}

type StockResponse = {
  stock: {
    article: string;
    cost: number;
    discount: number;
    quantity: number;
    volume: number;
    weight: number;
    size: string | null;
    unit: string | null;
  };
};

const INITIAL_FORM: StockFormData = {
  productId: 0,
  article: '',
  cost: 0,
  discount: 0,
  quantity: 0,
  volume: 0,
  weight: 0,
  size: null,
  unit: null,
};

const AddStockModal: React.FC<AddStockModalProps> = ({
  isOpen,
  productId,
  stockId,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<StockFormData>({ ...INITIAL_FORM, productId });
  const { data, error: stockError } = useStock(stockId);
  const stockDetails = (data as StockResponse | undefined)?.stock;

  useEffect(() => {
    setFormData((prev) => ({ ...prev, productId }));
  }, [productId]);

  useEffect(() => {
    if (stockDetails) {
      setFormData({
        productId,
        article: stockDetails.article ?? '',
        cost: stockDetails.cost ?? 0,
        discount: stockDetails.discount ?? 0,
        quantity: stockDetails.quantity ?? 0,
        volume: stockDetails.volume ?? 0,
        weight: stockDetails.weight ?? 0,
        size: stockDetails.size,
        unit: stockDetails.unit,
      });
    } else {
      setFormData({ ...INITIAL_FORM, productId });
    }
  }, [stockDetails, productId]);

  const [addStock, { loading: adding, error }] = useAddStock();
  const [updateStock, { loading: updating }] = useUpdateStock();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (stockId == null) {
        const result = await addStock({ variables: { input: formData } });
        const addedStock = (result.data as { addStock: { pk: number } } | undefined)?.addStock;
        console.log('✅ Добавлено:', addedStock);
      } else {
        await updateStock({
          variables: {
            pk: stockId,
            input: formData,
          },
        });
      }
      onSubmit(formData);
      onClose();
    } catch (err) {
      console.error('❌ Ошибка добавления:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 backdrop-blur">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-gradient-to-r from-rose-50 via-white to-white">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-rose-500 font-semibold mb-1 flex items-center gap-2">
              <PackagePlus size={14} />
              {stockId ? 'Редактирование склада' : 'Новая складская позиция'}
            </p>
            <h2 className="text-2xl font-semibold text-gray-900">
              {stockId ? 'Обновите информацию по запасу' : 'Добавьте новую вариацию товара'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Цена, объём, вес и остатки — всё под контролем.
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

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6">
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-5">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold uppercase tracking-wide">
              <Layers size={16} className="text-rose-500" />
              Основные сведения
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Артикул / SKU"
                required
                value={formData.article}
                onChange={(e) => setFormData({ ...formData, article: e.target.value })}
              />
              <Input
                label="Единица измерения"
                value={formData.unit ?? ''}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="мл, г и т.д."
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Input
                label="Объем"
                type="number"
                required
                value={String(formData.volume ?? 0)}
                onChange={(e) => setFormData({ ...formData, volume: Number(e.target.value) })}
              />
              <Input
                label="Вес"
                type="number"
                required
                value={String(formData.weight ?? 0)}
                onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
              />
              <Input
                label="Размер / вариация"
                value={formData.size ?? ''}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                placeholder="Например, 50 мл"
              />
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-5">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold uppercase tracking-wide">
              <PoundSterling size={16} className="text-emerald-500" />
              Стоимость и остатки
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-700">
                  <Gauge size={14} />
                  Текущая цена
                </div>
                <Input
                  label="Цена со скидкой"
                  type="number"
                  required
                  value={String(formData.discount ?? 0)}
                  onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                />
              </div>
              <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-rose-700">
                  <Beaker size={14} />
                  Базовая цена
                </div>
                <Input
                  label="Старая цена"
                  type="number"
                  value={String(formData.cost ?? 0)}
                  onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Количество на складе"
                type="number"
                required
                value={String(formData.quantity ?? 0)}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
              />
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-500">
                <p className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <Scale size={16} className="text-gray-500" />
                  Советы по остаткам
                </p>
                <p>
                  Обновляйте количество после каждой поставки, чтобы избежать перепродаж.
                </p>
              </div>
            </div>
          </section>

          {error && (
            <div className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg p-3">
              Ошибка при сохранении склада. Попробуйте ещё раз.
            </div>
          )}
          {stockError && (
            <div className="text-sm text-amber-600 bg-amber-50 border border-amber-100 rounded-lg p-3">
              Не удалось загрузить склад: {stockError.message}
            </div>
          )}

          <div className="flex flex-wrap gap-3 justify-end pt-2">
            <Button variant="outline" onClick={onClose} disabled={adding || updating} type="button">
              Отмена
            </Button>
            <Button variant="primary" type="submit" disabled={adding || updating}>
              {stockId != null
                ? updating
                  ? 'Сохраняем...'
                  : 'Обновить хранилище'
                : adding
                  ? 'Добавляем...'
                  : 'Добавить хранилище'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStockModal;
