'use client';

import React from 'react';
import { X, DeleteIcon, Edit2Icon } from 'lucide-react';
import { useDeleteStock, useProductStocks } from '@/app/hooks/useProducts';
import AddStockModal from './AddStockModal';



interface UpdateStockModalProps {
  isOpen: boolean;
  productId: number;
  onClose: () => void;
}


const UpdateStockModal: React.FC<UpdateStockModalProps> = ({ isOpen, onClose, productId }) => {
    const { data, loading, error, refetch  } = useProductStocks(productId!);
    const [isActiveAddStockModal, setIsActiveAddStockModal] = React.useState(false);
    const [selectedStockId, setSelectedStockId] = React.useState<number | null>(null);
    const [deleteStock, { loading: deleting, error: deleteError }] = useDeleteStock();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Хранилище: {productId}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                    <X size={20} />
                    </button>
                </div>
                <div className="p-6">

                    <table className="min-w-full table-auto border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Артикул</th>
                                <th>Изначальная цена</th>
                                <th>Скидочная цена</th>
                                <th>Количество</th>
                                <th>Размер</th>
                                <th>Ед. измерения</th>
                                <th>Объем</th>
                                <th>Вес</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && <tr><td colSpan={10}>Загрузка...</td></tr>}
                            {error && <tr><td colSpan={10} className="text-red-500">Ошибка загрузки складов: {error.message}</td></tr>}
                            {data?.stocks.length === 0 && !loading && (
                                <tr key="no-stocks">
                                    <td colSpan={10} className="text-center py-4">Нет складов для этого товара.</td>
                                </tr>
                            )}
                            {data?.stocks.map((stock: any) => (
                                <tr key={stock.pk} className="border-t border-gray-200">
                                    <td className="p-2 border border-gray-200">{stock.pk}</td>
                                    <td className="p-2 border border-gray-200">{stock.article}</td>
                                    <td className="p-2 border border-gray-200">{stock.cost}</td>
                                    <td className="p-2 border border-gray-200">{stock.discount}</td>
                                    <td className="p-2 border border-gray-200">{stock.quantity}</td>
                                    <td className="p-2 border border-gray-200">{stock.size}</td>
                                    <td className="p-2 border border-gray-200">{stock.unit}</td>
                                    <td className="p-2 border border-gray-200">{stock.volume}</td>
                                    <td className="p-2 border border-gray-200">{stock.weight}</td>
                                    <td className="p-2 border border-gray-200">
                                        <button className="p-2 hover:bg-gray-100 rounded-lg text-blue-600 mr-2" onClick={()=>{
                                            setIsActiveAddStockModal(true);
                                            setSelectedStockId(stock.pk);
                                        }}>
                                            <Edit2Icon size={18} />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg text-red-600" onClick={()=>{
                                            if(confirm("Вы действительно хотите удалить запись?")) {
                                                deleteStock({variables: {pk: stock.pk}})
                                                refetch();
                                            }
                                        }}>
                                            <DeleteIcon size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        type="button"
                        className="mt-4 px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
                        onClick={() => {
                            setIsActiveAddStockModal(true);
                            setSelectedStockId(null);
                        }}
                    >
                        Добавить хранилище
                    </button>
                </div>
                <AddStockModal
                    isOpen={isActiveAddStockModal}
                    onClose={() => {
                        setIsActiveAddStockModal(false);
                        refetch();
                    }}
                    productId={productId}
                    stockId={selectedStockId}
                    onSubmit={() => { refetch(); }}
                />
            </div>
        </div>
    );
};

export default UpdateStockModal;
