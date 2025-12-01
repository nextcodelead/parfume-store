// ----------------------
// Form Data Types
// ----------------------

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

// ----------------------
// Main Product Type
// ----------------------

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

// ----------------------
// Query Responses
// ----------------------

// Ответ для GET_PRODUCTS
export interface ProductsResponse {
  products: {
    pk: number;
    name: string;
    description: string;
    isPublished: boolean;
    isInMyCart?: boolean;

    photo: {
      imageUrl: string;
    } | null;

    brand: {
      pk: number;
      name: string;
    } | null;

    category: {
      pk: number;
      name: string;
    } | null;

    stocks: {
      discount: number;
      cost: number;
    }[];
  }[];

  // если ты используешь productsCount — оставь
  productsCount?: number;
}

// GET_STOCKS
export interface StocksResponse {
  stocks: Array<{
    pk: number;
    article?: string;
    cost: number;
    discount: number;
    quantity: number;
    size: string | null;
    unit: string | null;
    volume?: number;
    weight?: number;
  }>;
}

// GET_PRODUCT
export interface ProductResponse {
  product: {
    pk: number;
    name: string;
    description: string;
    aromNote?: string;
    brandId?: number;
    categoryId?: number;
    index?: number;
    sex?: string;
    showAtMain?: boolean;
    isPublished?: boolean;
  };
}

// GET_PRODUCT_IMAGES
export interface ProductImagesResponse {
  productImages: Array<{
    pk: number;
    asMain: boolean;
    imageUrl: string;
  }>;
}
