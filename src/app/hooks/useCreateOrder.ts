import { useQuery } from '@apollo/client/react';
import { GET_ORDERS } from '../graphql/queries';
import { useIsClient } from './useIsClient';

// Хук для создания заказа


// Хук для получения заказов пользователя
export const useOrders = () => {
  const isClient = useIsClient();
  return useQuery(GET_ORDERS, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    skip: !isClient,
  });
};

// Типы для удобства использования
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

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    slug: string;
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

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  order: Order;
}

export interface OrdersResponse {
  orders: Order[];
}
