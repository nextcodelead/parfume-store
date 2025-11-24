import { useQuery } from '@apollo/client/react';
import { STOCKS } from '../graphql/queries';
import { useIsClient } from './useIsClient';

// Хук для получения корзины пользователя
export const useStocks = (productId: number) => {
  const isClient = useIsClient();
  return useQuery(STOCKS, {
    variables: {
      filters: {
        productId: {
          equals: productId
        }
      }
    },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    skip: !isClient,
  });
};