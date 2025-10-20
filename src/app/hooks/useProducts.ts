import { useQuery } from '@apollo/client/react';
import { GET_PRODUCTS, GET_PRODUCT } from '../graphql/queries';

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