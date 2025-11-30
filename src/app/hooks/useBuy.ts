import { BEGIN_BUY, CREATE_ORDER } from '../graphql/mutations';
import { useMutation, useQuery } from '@apollo/client/react';
import { ORDER_CARTS } from '../graphql/queries';
import { Stock } from '../types/graphql'; // добавьте этот импорт

export interface ProductBuy {
  stockId: number;
  count: number;
}

// Интерфейсы для типизации
interface CreateOrderResponse {
  createUpdateOrder: {
    pk: number;
  };
}

interface CreateOrderVariables {
  pk?: number | null;
  order: {
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    country?: string;
    city?: string;
    street?: string;
    apartment?: string;
    zipCode?: string;
    deliveryNotes?: string;
    deliveryType?: string;
  };
}

// Добавьте интерфейс для orderCarts
interface OrderCartItem {
  id: string;
  cost: number;
  count: number;
  stock: {
    size: string;
    unit: string;
    product: {
      name: string;
      brand: {
        name: string;
      };
      photo: {
        imageUrl: string;
      } | null;
    };
  };
}

interface OrderCartsResponse {
  orderCarts: OrderCartItem[];
}

export const useBeginBuy = () => {
  return useMutation(BEGIN_BUY, { errorPolicy: "all" });
};

export const useCreateOrder = () => {
  return useMutation<CreateOrderResponse, CreateOrderVariables>(CREATE_ORDER, { errorPolicy: "all" });
};

export const useOrderCarts = () => {
  return useQuery<OrderCartsResponse>(ORDER_CARTS, {
    variables: {},
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};