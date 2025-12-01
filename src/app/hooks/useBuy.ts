import { useMutation, useQuery } from '@apollo/client/react';
import { BEGIN_BUY, CREATE_ORDER } from "../graphql/mutations";
import { ORDER_CARTS } from "../graphql/queries";

// ======================
// Типы
// ======================

export interface ProductBuy {
  stockId?: number | null;
  count: number;
}

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

interface OrderCartItem {
  id: string;
  cost: number;
  count: number;
  stock: {
    size: string;
    unit: string;
    product: {
      name: string;
      brand: { name: string };
      photo: { imageUrl: string } | null;
    };
  };
}

interface OrderCartsResponse {
  orderCarts: OrderCartItem[];
}

// ======================
// Хуки
// ======================

// Типы для мутации beginBuy
export interface BeginBuyPayload {
  success: boolean;
  orderId?: number;
  redirectUrl?: string;
  // любые дополнительные поля от сервера можно добавить сюда как optional
}

export interface BeginBuyResponse {
  beginBuy: BeginBuyPayload | null;
}

export interface BeginBuyVariables {
  products: ProductBuy[];
}

// ✔ ВСЁ ПРАВИЛЬНО (типизированный)
export const useBeginBuy = () => {
  return useMutation<BeginBuyResponse, BeginBuyVariables>(BEGIN_BUY, { errorPolicy: "all" });
};

// ✔ Полностью типизировано
export const useCreateOrder = () => {
  return useMutation<CreateOrderResponse, CreateOrderVariables>(CREATE_ORDER);
};

// ✔ orderCarts
export const useOrderCarts = () => {
  return useQuery<OrderCartsResponse>(ORDER_CARTS, {
    fetchPolicy: "cache-first",
  });
};
