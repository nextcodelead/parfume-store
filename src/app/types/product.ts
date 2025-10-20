export interface ProductFormData {
  name: string;
  price: string;
  oldPrice: string;
  description: string;
  notes: string;
  volume: string;
  quantity: string;
  images: string[];
}

export interface Product extends Omit<ProductFormData, 'price' | 'oldPrice' | 'quantity'> {
  id: number;
  price: number;
  oldPrice?: number;
  quantity: number;
  status: 'active' | 'draft' | 'outofstock';
}