import { BEGIN_BUY, CREATE_ORDER } from '../graphql/mutations';
import { useMutation, useQuery } from '@apollo/client/react';
import { ORDER_CARTS } from '../graphql/queries';

export interface ProductBuy {
  stockId: number;
  count: number;
}

// Добавьте интерфейсы для типизации
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

export const useBeginBuy = () => {
  return useMutation(BEGIN_BUY, { errorPolicy: "all" });
};

export const useCreateOrder = () => {
  return useMutation<CreateOrderResponse, CreateOrderVariables>(CREATE_ORDER, { errorPolicy: "all" });
};

export const useOrderCarts = () => {
  return useQuery(ORDER_CARTS, {
    variables: {},
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};