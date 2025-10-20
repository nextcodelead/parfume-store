import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../Button';
import Input from './Input';
import Textarea from './Textarea';
import { ProductFormData } from '../../types/product';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: ProductFormData) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    oldPrice: '', // всегда строка
    description: '',
    notes: '',
    volume: '',
    quantity: '',
    images: []
  });

  const handleImageAdd = (url: string) => {
    if (images.length < 4) {
      setImages([...images, url]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ ...formData, images });
    onClose();
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
          {/* Изображения */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Изображения (до 4)</label>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center">
                  {images[idx] ? (
                    <img src={images[idx]} alt="" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleImageAdd(`https://placeholder.com/400x400?text=Image+${idx + 1}`)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Добавить фото
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

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
              value={formData.price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, price: e.target.value })}
            />
            <Input
              label="Старая цена"
              type="number"
              value={formData.oldPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, oldPrice: e.target.value })}
            />
          </div>

          <Textarea
            label="Описание"
            required
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
          />

          <Textarea
            label="Ноты аромата"
            required
            value={formData.notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, notes: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Объем"
              required
              value={formData.volume}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, volume: e.target.value })}
            />
            <Input
              label="Количество"
              type="number"
              required
              value={formData.quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, quantity: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button variant="primary" type="submit">
              Добавить товар
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;