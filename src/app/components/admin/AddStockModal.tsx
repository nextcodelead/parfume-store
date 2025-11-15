'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { X } from 'lucide-react';
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

const AddStockModal: React.FC<AddStockModalProps> = ({ isOpen, productId, stockId, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<
    StockFormData
  >({
    productId: productId,
    article: "",
    cost: 0,
    discount: 0,
    quantity: 0,
    volume: 0,
    weight: 0,
    size: null,
    unit: null,
  });

  const { loading, data, error: stockError } = useStock(stockId);
  useEffect(() => {
    if (data?.stock) {
      const p = data.stock;
      setFormData({
        productId: productId,
        article: p.article,
        cost: p.cost,
        discount: p.discount,
        quantity: p.quantity,
        volume: p.volume,
        weight: p.weight,
        size: p.size,
        unit: p.unit,
      });
    }
  }, [data]);

  const [addStock, { loading: adding, error }] = useAddStock();
  const [updateStock, { loading: updating, error: updateError }] = useUpdateStock();

  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if(stockId == null) {
        const result = await addStock({ variables: { input: formData } });
        console.log('✅ Добавлено:', result.data?.addStock);
      } else {
        await updateStock({
          variables: {
            pk: stockId,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          {stockId != null ? (<h2 className="text-xl font-bold text-gray-900">Редактировать товар</h2>) : (
          <h2 className="text-xl font-bold text-gray-900">Добавить новый товар</h2>
          )}
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          
          <Input
            label="Артикул"
            required
            value={formData.article}
            onChange={(e) => setFormData({ ...formData, article: e.target.value })}
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
              value={String(formData.quantity ?? '0')}
              onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
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
              value={formData.unit ?? 'мл'}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Размер"
              type="number"
              required
              value={formData.size ?? ''}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600">Ошибка при добавлении Хранилище. Попробуйте ещё раз.</div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose} disabled={adding}>
              Отмена
            </Button>
            <Button variant="primary" type="submit" disabled={adding}>
              {stockId != null ? (updating ? 'Обновление...' : 'Обновить хранилище') : (adding ? 'Добавление...' : 'Добавить хранилище')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStockModal;
