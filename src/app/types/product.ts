export interface StockFormData {
  productId: number;
  article: string;
  cost: number;
  discount: number;
  quantity: number;
  volume: number;
  weight: number;
  size: string | null;
  unit: string | null;
}

export interface ProductFormData {
  name: string;
  categoryId: number | null;
  brandId: number | null;
  description: string;
  aromNote: string;
  index: number;
  isPublished: boolean;
  sex: string;
  showAtMain: boolean;
}

export interface Product {
  pk: number;
  name: string;
  article: string;
  cost: number;
  discount: number;
  photo: {
    imageUrl: string;
  } | null;
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