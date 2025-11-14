export interface ProductFormData {
  name: string;
  article: string;
  categoryId: number | null;
  brandId: number | null;
  discount: number | null; 
  cost: number | null;
  description: string;
  volume: number | null;
  aromNote: string;
  count: number;
  index: number;
  isPublished: boolean;
  sex: string;
  weight: number;
  unit: string;
  size: string;
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