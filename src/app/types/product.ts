export interface ProductFormData {
  name: string;
  article: string;
  categoryId: number | null;
  brandId: number | null;
  discount: number | null; 
  cost: number | null;
  description?: string;
  volume: number | null;
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