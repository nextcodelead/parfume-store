import { useMutation, useQuery } from '@apollo/client/react';
import { GET_CATEGORIES, GET_BRANDS, GET_PRODUCTS, GET_PRODUCTS_ADMIN, GET_PRODUCTS_COUNT_ADMIN, ADMIN_CREATE_PRODUCT_SELECT_CATEGORY, MAIN_CATEGORIES } from '../graphql/queries';
import { useIsClient } from './useIsClient';
import { ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from '../graphql/mutations';

export const useCategories = () => {
  const isClient = useIsClient();
  return useQuery<CategoriesResponse>(GET_CATEGORIES, {
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

export const useSelectCategories = () => {
  const isClient = useIsClient();
  return useQuery<CategoriesResponse>(ADMIN_CREATE_PRODUCT_SELECT_CATEGORY, {
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
      "pagination": {
        "limit": 4,
        "offset": 0
      }
    },
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    skip: !isClient,
  });
};

// Тип для ответа запроса списка продуктов
export interface AdminProductsResponse {
  products: {
    pk: number;
    name: string;
    category: {
      name: string;
    };
    count: number;
    countCells: number;
    status: string;
    photo?: {
      imageUrl: string;
    };
  }[];
}

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
  return useQuery<AdminProductsResponse>(GET_PRODUCTS_ADMIN, {
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

// Тип для ответа запроса количества продуктов
export interface ProductsCountResponse {
  productsCount: number;
}

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
  return useQuery<ProductsCountResponse>(GET_PRODUCTS_COUNT_ADMIN, {
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
export const useMainCategories = () => {
  const isClient = useIsClient();
  return useQuery<CategoriesResponse>(MAIN_CATEGORIES, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    skip: !isClient,
  });
};
export const useAddCategory = () => {
  return useMutation(ADD_CATEGORY, { 
    errorPolicy: "all" 
  });
};
export const useDeleteCategory = () => {
  return useMutation(DELETE_CATEGORY, { 
    errorPolicy: "all" 
  });
};
export const useUpdateCategory = () => {
  return useMutation(UPDATE_CATEGORY, { 
    errorPolicy: "all" 
  });
};



// Типы для удобства использования (обновлены под реальную схему)
export interface Category {
  pk: number;
  name: string;
  iconUrl?: string | null;
  description?: string | null;
  parentId?: number | null;
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
