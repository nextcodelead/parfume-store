// hooks/useAllProducts.ts
import { useQuery } from '@apollo/client/react';
import { GET_PRODUCTS } from '../graphql/queries';
import { useIsClient } from './useIsClient';

export const useAllProducts = () => {
  const isClient = useIsClient();
  
  return useQuery(GET_PRODUCTS, {
    variables: {
      filters: {}, // ← без фильтров, все товары
      pagination: { limit: 20 }
    },
    skip: !isClient
  });
};