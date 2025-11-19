'use client';

import React from 'react';
import { X, DeleteIcon, Edit2Icon, Layers, Package, TrendingDown, Weight } from 'lucide-react';
import { useDeleteStock, useProductStocks } from '@/app/hooks/useProducts';
import AddStockModal from './AddStockModal';

interface UpdateStockModalProps {
  isOpen: boolean;
  productId: number;
  onClose: () => void;
}

type StockItem = {
  pk: number;
  article: string;
  cost: number;
  discount: number;
  quantity: number;
  size: string;
  unit: string;
  volume: number;
  weight: number;
};

type StockResponse = {
  stocks: StockItem[];
};

const UpdateStockModal: React.FC<UpdateStockModalProps> = ({ isOpen, onClose, productId }) => {
  const { data, loading, error, refetch } = useProductStocks(productId);
  const stocks = (data as StockResponse | undefined)?.stocks ?? [];
  const [isActiveAddStockModal, setIsActiveAddStockModal] = React.useState(false);
  const [selectedStockId, setSelectedStockId] = React.useState<number | null>(null);
  const [deleteStock, { loading: deleting }] = useDeleteStock();
  const [actionId, setActionId] = React.useState<number | null>(null);

  if (!isOpen) return null;

  const handleEdit = (stockId: number) => {
    setSelectedStockId(stockId);
    setIsActiveAddStockModal(true);
  };

  const handleDelete = async (stockId: number) => {
    if (!confirm('Удалить складскую позицию безвозвратно?')) return;
    setActionId(stockId);
    try {
      await deleteStock({ variables: { pk: stockId } });
      await refetch();
    } finally {
      setActionId(null);
    }
  };

  const handleAddStock = () => {
    setSelectedStockId(null);
    setIsActiveAddStockModal(true);
  };

  const isEmpty = !loading && stocks.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 backdrop-blur">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-gradient-to-r from-rose-50 to-white">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-rose-500 font-semibold mb-1 flex items-center gap-2">
              <Layers size={14} />
              Складские остатки
            </p>
            <h2 className="text-2xl font-semibold text-gray-900">
              Управление запасами товара #{productId}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Следите за ценами, размерами и количеством на одном экране.
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

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6">
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">Добавьте новую позицию</p>
                <p className="text-xs text-gray-500">Артикул, объём, цена и количество — всё в одной форме.</p>
              </div>
              <button
                type="button"
                onClick={handleAddStock}
                className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600 transition"
              >
                <Package size={16} />
                Добавить хранилище
              </button>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            {loading ? (
              <div className="text-sm text-gray-500">Загружаем складские позиции...</div>
            ) : error ? (
              <p className="text-sm text-rose-600">Ошибка загрузки складов: {error.message}</p>
            ) : isEmpty ? (
              <div className="flex flex-col items-center justify-center text-center p-10 text-gray-500">
                <TrendingDown size={36} className="text-rose-400 mb-3" />
                <p className="text-base font-semibold text-gray-900 mb-1">Склад пуст</p>
                <p className="text-sm">Добавьте первую позицию, чтобы начать продажи.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {stocks.map((stock) => (
                  <div
                    key={stock.pk}
                    className="rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition"
                  >
                    <div className="border-b border-gray-50 px-5 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase text-gray-500 tracking-widest">Артикул</p>
                        <p className="text-base font-semibold text-gray-900">{stock.article}</p>
                      </div>
                      <span className="text-xs font-semibold text-gray-500">ID: {stock.pk}</span>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-rose-50/60 border border-rose-100 p-3">
                          <p className="text-xs text-gray-500">Цена</p>
                          <p className="text-lg font-semibold text-gray-900">{stock.cost} ₽</p>
                        </div>
                        <div className="rounded-lg bg-emerald-50/60 border border-emerald-100 p-3">
                          <p className="text-xs text-gray-500">Цена со скидкой</p>
                          <p className="text-lg font-semibold text-emerald-600">{stock.discount} ₽</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="flex flex-col">
                          <span className="text-xs uppercase text-gray-400">Количество</span>
                          <span className="font-semibold">{stock.quantity} шт</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs uppercase text-gray-400">Размер</span>
                          <span className="font-semibold">{stock.size}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs uppercase text-gray-400">Ед. измерения</span>
                          <span className="font-semibold">{stock.unit}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs uppercase text-gray-400">Объем / Вес</span>
                          <span className="font-semibold">
                            {stock.volume} мл / {stock.weight} г
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(stock.pk)}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                        >
                          <Edit2Icon size={16} />
                          Редактировать
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(stock.pk)}
                          disabled={deleting && actionId === stock.pk}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition disabled:opacity-60"
                        >
                          {deleting && actionId === stock.pk ? (
                            <Weight size={16} className="animate-spin" />
                          ) : (
                            <DeleteIcon size={16} />
                          )}
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <AddStockModal
          isOpen={isActiveAddStockModal}
          onClose={() => {
            setIsActiveAddStockModal(false);
            refetch();
          }}
          productId={productId}
          stockId={selectedStockId}
          onSubmit={() => {
            refetch();
          }}
        />
      </div>
    </div>
  );
};

export default UpdateStockModal;
