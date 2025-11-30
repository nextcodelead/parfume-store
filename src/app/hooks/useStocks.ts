import { useQuery } from '@apollo/client/react';
import { STOCKS } from '../graphql/queries';
import { useIsClient } from './useIsClient';
import { Stock } from '../types/graphql'; // или правильный путь

// Добавьте интерфейс для ответа
interface StocksResponse {
  stocks: Stock[];
}

// Хук для получения корзины пользователя
export const useStocks = (productId: number) => {
  const isClient = useIsClient();
  return useQuery<StocksResponse>(STOCKS, {
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