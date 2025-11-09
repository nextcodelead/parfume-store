import { useMutation, useQuery } from '@apollo/client/react';
import { GET_PRODUCTS } from '../graphql/queries';
import { ADMIN_ADD_PRODUCT } from '../graphql/mutations';

export interface ProductInput {
  name: string,
  cost: number,
  categoryId: number,
  brandId: number,
  article: string,
  discount: number,
  description: string,
  aromNote: string | null,
  volume: number,
  count: number
}

// Хук для получения списка продуктов
export const useProducts = () => {
  return useQuery(GET_PRODUCTS, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};

export const useAddProduct = () => {
  return useMutation(ADMIN_ADD_PRODUCT, { errorPolicy: "all" });
};