'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAddOrUpdateImageProduct, useDeleteProductImage, useProductImages, useUpdateProductImage } from '@/app/hooks/useProducts';
import Image from 'next/image';
import { uploadImage } from '@/app/hooks/useUploadImage';



interface UploadImageModalProps {
  isOpen: boolean;
  productId: number | null;
  onClose: () => void;
}


const UploadImageModal: React.FC<UploadImageModalProps> = ({ isOpen, onClose, productId }) => {
    const { data, loading, error, refetch  } = useProductImages(productId!);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [addOrUpdateImageProduct, { loading: adding, error: addOrUpdateError }] = useAddOrUpdateImageProduct();
    const [deleteProductImage, { loading: deleting, error: deleteError }] = useDeleteProductImage();
    const [updateProductImage, { loading: updating, error: updateError }] = useUpdateProductImage();
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const handleOpenFileDialog = () => {
      fileInputRef.current?.click();
    };
    if (!isOpen) return null;
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;

        if (!file) return;

        uploadImage(file)
        .then((result) => {
            if(result.ok) {
                console.log("Uploaded:", result);
                setErrorMessage(null);
                addOrUpdateImageProduct({
                    variables: {
                        input: {
                            imageUrl: result.key,
                            asMain: false,
                            productId: productId!
                        },
                        pk: null
                    }
                }).then(() => {
                    refetch();
                });
            } else {
                setErrorMessage("Ошибка при загрузке изображения");
            }
        })
        .catch(console.error);
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Изображение товара: {productId}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                    <X size={20} />
                    </button>
                </div>
                <div className="p-6">
                    {loading && <p>Загрузка изображений...</p>}
                    {error && <p className="text-red-500">Ошибка загрузки изображений: {error.message}</p>}
                    <table className="min-w-full table-auto border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Главная</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.productImages.length === 0 && (
                                <tr key="no-images">
                                    <td colSpan={3} className="text-center py-4">Нет изображений для этого товара.</td>
                                </tr>
                            )}
                            {data?.productImages.map((image: any) => (
                                <tr key={image.pk} className="border-t border-gray-200">
                                    <td className="px-4 py-2">
                                        <Image src={`https://dataset.uz/${image.imageUrl}`} alt={`Product Image ${image.pk}`} width={80} height={80} className="object-cover rounded" />
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {image.asMain ? '✅' : '❌'}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button className="text-blue-600 hover:underline mr-4" onClick={() => { updateProductImage({ variables: { pk: image.pk, input: { asMain: true } } }).then(() => { refetch(); }); }}>Сделать главной</button>
                                        <button className="text-red-600 hover:underline" onClick={() => {
                                            if(confirm('Вы уверены, что хотите удалить это изображение?')) {
                                                deleteProductImage({ variables: { pk: image.pk } }).then(() => {
                                                    refetch();
                                                });
                                            }
                                        }}>Удалить</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={handleOpenFileDialog}
                        className="mt-4 px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
                        >
                            Загрузить новое изображение
                    </button>
                    <div className="mt-4">
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </div>
                    {addOrUpdateError && <div className="mt-4 text-red-500">Ошибка при добавлении/обновлении изображения: {addOrUpdateError.message}</div>}
                </div>
            </div>
        </div>
    );
};

export default UploadImageModal;
