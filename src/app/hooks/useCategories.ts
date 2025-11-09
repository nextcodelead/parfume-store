import { useQuery } from '@apollo/client/react';
import { GET_CATEGORIES, GET_BRANDS, GET_PRODUCTS, GET_PRODUCTS_ADMIN, GET_PRODUCTS_COUNT_ADMIN } from '../graphql/queries';
import { useIsClient } from './useIsClient';

// Хук для получения всех категорий
export const useCategories = () => {
  const isClient = useIsClient();
  return useQuery(GET_CATEGORIES, {
    variables: { 
      "filter": {
        "parentId": {
          "equals": null
        }
      }      
    },
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    skip: !isClient,
  });
};

export const useProductsByDiscount = () => {
  const isClient = useIsClient();
  return useQuery(GET_PRODUCTS, {
    variables: {
      "filters": {
        "discount": {
          "not": 0
        }
      },
<<<<<<< HEAD
      pagination: {
        limit: 4,
=======
      "pagination": {
        "limit": 4,
        "offset": 0
>>>>>>> 3d5ef32 (some changes)
      }
    },
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    skip: !isClient,
  });
};

export const useAdminProducts = (name: string | null, page: number = 0) => {
  const isClient = useIsClient();
  let filters = null;
  if (name) {
    filters = {
      "name": {
        "contains": name
      }
    };
  }
  return useQuery(GET_PRODUCTS_ADMIN, {
    variables: { 
      filters: filters,
      pagination: {
        offset: page * 5,
        limit: 5,
      }
    },
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    skip: !isClient,
  });
};
export const useAdminProductsCount = (name: string | null) => {
  const isClient = useIsClient();
  let filters = null;
  if (name) {
    filters = {
      "name": {
        "contains": name
      }
    };
  }
  return useQuery(GET_PRODUCTS_COUNT_ADMIN, {
    variables: { 
      filters: filters,
    },
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
  pk: number;
  name: string;
  iconUrl: string | null;
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
