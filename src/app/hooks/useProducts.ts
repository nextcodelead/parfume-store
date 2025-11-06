import { useMutation, useQuery } from '@apollo/client/react';
import { GET_PRODUCTS, GET_PRODUCT } from '../graphql/queries';
import { ADMIN_ADD_PRODUCT } from '../graphql/mutations';

export interface ProductInput {
  name: string,
  cost: number,
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

// Хук для получения конкретного продукта
export const useProduct = (pk: number) => {
  return useQuery(GET_PRODUCT, {
    variables: { pk },
    skip: !pk,
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};

export const useAddProduct = (input: ProductInput) => {
  return useMutation(ADMIN_ADD_PRODUCT, {
    variables: { input },
    errorPolicy: 'all',
  });
};