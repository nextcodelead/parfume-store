import { useQuery } from '@apollo/client/react';
import { GET_CATEGORIES, GET_BRANDS } from '../graphql/queries';
import { useIsClient } from './useIsClient';

// Хук для получения всех категорий
export const useCategories = () => {
  const isClient = useIsClient();
  return useQuery(GET_CATEGORIES, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    skip: !isClient,
  });
};

// Хук для получения всех брендов
export const useBrands = () => {
  const isClient = useIsClient();
  return useQuery(GET_BRANDS, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    skip: !isClient,
  });
};

// Типы для удобства использования (обновлены под реальную схему)
export interface Category {
  uid: string;
  name: string;
}

export interface Brand {
  name: string;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface BrandsResponse {
  brands: Brand[];
}
