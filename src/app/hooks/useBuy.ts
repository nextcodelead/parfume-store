
import { BEGIN_BUY, CREATE_ORDER } from '../graphql/mutations';
import { useMutation, useQuery } from '@apollo/client/react';
import { ORDER_CARTS } from '../graphql/queries';

export interface ProductBuy {
  stockId: number;
  count: number;
}

export const useBeginBuy = () => {
  return useMutation(BEGIN_BUY, { errorPolicy: "all" });
};
export const useCreateOrder = () => {
  return useMutation(CREATE_ORDER, { errorPolicy: "all" });
};

export const useOrderCarts = () => {
  return useQuery(ORDER_CARTS, {
    variables: {},
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};