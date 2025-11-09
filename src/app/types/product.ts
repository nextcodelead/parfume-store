export interface ProductFormData {
  name: string;
  article: string;
  discount?: string; // хранится как строка в форме
  price?: string; // цена в форме как строка
  oldPrice?: string;
  description?: string;
  volume?: string; // объем как строка
  brand?: string; // будет содержать PK бренда в виде строки
  category?: string; // будет содержать PK категории в виде строки
  isPublished?: boolean;
}

export interface Product {
  pk: number;
  name: string;
  article: string;
  cost: number;
  discount: number;
  photoUrl?: string; // ← сделали опциональной
  description: string;
  isPublished: boolean;
  brand: {
    pk: number;
    name: string;
  };
  category: {
    pk: number;
    name: string;
  };
  images: Array<{
    pk: number;
    imageUrl: string;
    asMain: boolean;
  }>;
  stocks?: Array<{
    pk: number;
    quantity: number;
  }>;
}