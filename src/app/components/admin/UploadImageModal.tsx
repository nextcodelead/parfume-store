'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Camera, Crown, ImagePlus, Loader2, Trash2, Upload, X } from 'lucide-react';
import { useAddOrUpdateImageProduct, useDeleteProductImage, useProductImages, useUpdateProductImage } from '@/app/hooks/useProducts';
import { uploadImage } from '@/app/hooks/useUploadImage';



interface UploadImageModalProps {
  isOpen: boolean;
  productId: number | null;
  onClose: () => void;
}

type ProductImage = {
  pk: number;
  imageUrl: string;
  asMain: boolean;
};

type ProductImagesResponse = {
  productImages: ProductImage[];
};

const UploadImageModal: React.FC<UploadImageModalProps> = ({ isOpen, onClose, productId }) => {
  const { data, loading, error, refetch } = useProductImages(productId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [addOrUpdateImageProduct, { loading: adding, error: addOrUpdateError }] = useAddOrUpdateImageProduct();
  const [deleteProductImage, { loading: deleting }] = useDeleteProductImage();
  const [updateProductImage, { loading: updating }] = useUpdateProductImage();
  const [actionId, setActionId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const productImages =
    (data as ProductImagesResponse | undefined)?.productImages ?? [];
  const isEmpty = !loading && productImages.length === 0;

  if (!isOpen || !productId) return null;

  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    try {
      const result = await uploadImage(file);
      if (!result.ok) {
        setErrorMessage('Ошибка при загрузке изображения');
        return;
      }
      setErrorMessage(null);
      await addOrUpdateImageProduct({
        variables: {
          input: {
            imageUrl: result.key,
            asMain: false,
            productId,
          },
          pk: null,
        },
      });
      await refetch();
    } catch (uploadErr) {
      console.error(uploadErr);
      setErrorMessage('Не удалось загрузить изображение');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleMakeMain = async (imageId: number) => {
    setActionId(imageId);
    try {
      await updateProductImage({
        variables: { pk: imageId, input: { asMain: true } },
      });
      await refetch();
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (imageId: number) => {
    if (!confirm('Удалить изображение безвозвратно?')) return;
    setActionId(imageId);
    try {
      await deleteProductImage({ variables: { pk: imageId } });
      await refetch();
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 backdrop-blur">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-gradient-to-r from-rose-50 to-white">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-rose-500 font-semibold mb-1 flex items-center gap-2">
              <Camera size={14} />
              Галерея товара
            </p>
            <h2 className="text-2xl font-semibold text-gray-900">
              Управление изображениями #{productId}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Загрузите новые фото и настройте главное изображение для карточки товара.
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-900">Добавить изображение</p>
                <p className="text-xs text-gray-500">Минимум 800x800, jpg/png</p>
              </div>
              <div
                className="flex flex-1 items-center gap-3 rounded-xl border-2 border-dashed border-rose-200 bg-rose-50/60 px-4 py-3"
              >
                <div className="p-2 bg-white rounded-full border border-rose-100 text-rose-500">
                  <Upload size={18} />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="font-semibold text-gray-900">Перетащите файл сюда</span>
                  <span className="text-gray-500">или выберите через проводник</span>
                </div>
                <button
                  type="button"
                  onClick={handleOpenFileDialog}
                  className="ml-auto inline-flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600 transition"
                  disabled={adding}
                >
                  {adding ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
                  Загрузить
                </button>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            {errorMessage && (
              <p className="mt-3 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
                {errorMessage}
              </p>
            )}
          </section>

          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            {loading ? (
              <div className="flex items-center gap-3 text-gray-500">
                <Loader2 size={18} className="animate-spin" />
                Загружаем изображения...
              </div>
            ) : error ? (
              <p className="text-rose-600 text-sm">
                Ошибка загрузки изображений: {error.message}
              </p>
            ) : isEmpty ? (
              <div className="flex flex-col items-center justify-center text-center p-8 text-gray-500">
                <ImagePlus size={36} className="text-rose-400 mb-3" />
                <p className="text-base font-semibold text-gray-900 mb-1">Нет изображений</p>
                <p className="text-sm text-gray-500">Загрузите первое фото, чтобы карточка выглядела живо.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {productImages.map((image) => (
                  <div
                    key={image.pk}
                    className={`relative rounded-xl border ${
                      image.asMain ? 'border-rose-400 shadow-lg shadow-rose-100' : 'border-gray-100 shadow-sm'
                    } overflow-hidden bg-white`}
                  >
                    {image.asMain && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-rose-500/90 px-3 py-1 text-xs font-semibold text-white">
                        <Crown size={12} />
                        Главное
                      </span>
                    )}
                    <div className="relative h-48 w-full bg-gray-100">
                      <Image
                        src={`https://dataset.uz/${image.imageUrl}`}
                        alt={`Product Image ${image.pk}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>ID: {image.pk}</span>
                        <span>{image.asMain ? 'Основное фото' : 'Дополнительное'}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleMakeMain(image.pk)}
                          disabled={image.asMain || updating || actionId === image.pk}
                          className={`flex-1 inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                            image.asMain
                              ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                              : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                          }`}
                        >
                          {actionId === image.pk && updating ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Crown size={16} />
                          )}
                          Главное
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(image.pk)}
                          disabled={deleting && actionId === image.pk}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition disabled:text-gray-400 disabled:border-gray-200"
                        >
                          {actionId === image.pk && deleting ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {addOrUpdateError && (
              <p className="mt-4 text-sm text-rose-600">Ошибка сохранения: {addOrUpdateError.message}</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default UploadImageModal;
