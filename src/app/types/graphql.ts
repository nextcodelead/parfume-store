// GraphQL типы для парфюмерного магазина

export interface Product {
  pk: number;  // ← использовать pk вместо id
  name: string;
  cost: number; // ← использовать cost вместо price
  discount?: number;
  stocks?: {
    cost?: number;
    discount?: number;
  }[];
  photo: {
    imageUrl: string;
  } | null;
  description?: string;
  isPublished?: boolean;
  // Дополнительные поля если нужны
  rating?: number;
  reviews?: number;
  category?: string;
  isNew?: boolean;
  oldPrice?: number; // для отображения старой цены
}

export interface Category {
  pk: number;
  iconUrl: string;
  name: string;
  children?: Subcategory[];
}

export interface Subcategory extends Category {
  groupName: string;
}

export interface Brand {
  name: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  sex: string;
  dateOfBirth: string;
  avatar: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
  };
}

export interface UserCart {
  id: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

// Response типы
export interface ProductsResponse {
  products: Product[];
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface BrandsResponse {
  brands: Brand[];
}

export interface MeResponse {
  me: User;
}

export interface OrdersResponse {
  orders: Order[];
}

export interface UserCartResponse {
  userCart: UserCart;
}

// Input типы
export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  sex?: string;
  dateOfBirth?: string;
  avatar?: string;
}

export interface CreateOrderInput {
  deliveryAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  deliveryMethod: string;
  paymentMethod: string;
  notes?: string;
}
