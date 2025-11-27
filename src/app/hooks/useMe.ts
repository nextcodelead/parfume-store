import { useQuery } from '@apollo/client/react';
import { ME_MAIN, ME_USER_CART } from '../graphql/queries';
import { useIsClient } from './useIsClient';
import { MeUserCartResponse } from '../types/graphql';

// Хук для получения корзины пользователя
export const useMeMain = () => {
  const isClient = useIsClient();
  return useQuery(ME_MAIN, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    pollInterval: 30000, // Обновляем корзину каждые 30 секунд
    skip: !isClient,
  });
};
export const useMeUserCart = () => {
  const isClient = useIsClient();
  return useQuery<MeUserCartResponse>(ME_USER_CART, {
    errorPolicy: 'all',
    skip: !isClient,
  });
};