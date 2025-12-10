import { useMutation, useQuery } from '@apollo/client/react';
import { ADMIN_CREATE_PRODUCT_SELECT_BRAND, BRANDS_ADMIN_PAGE } from '../graphql/queries';
import { useIsClient } from './useIsClient';
import { ADD_BRAND, DELETE_BRAND, UPDATE_BRAND } from '../graphql/mutations';

interface Brand {
  pk: number;
  name: string;
}

interface SelectBrandsData {
  brands: Brand[];
}

interface AddBrandType {
  pk: number;
  name: string;
  siteUrl?: string;
}

export const useSelectBrands = () => {
  const isClient = useIsClient();

  return useQuery<SelectBrandsData>(ADMIN_CREATE_PRODUCT_SELECT_BRAND, {
    variables: {},
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    skip: !isClient,
  });
};
export const useAdminBrands = () => {
  return useQuery<SelectBrandsData>(BRANDS_ADMIN_PAGE, {
    variables: {},
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};

export const useAddBrand = () => {
  return useMutation(ADD_BRAND, { 
    errorPolicy: "all" 
  });
};

export const useUpdateBrand = () => {
  return useMutation(UPDATE_BRAND, { 
    errorPolicy: "all" 
  });
};
export const useDeleteBrand = () => {
  return useMutation(DELETE_BRAND, { 
    errorPolicy: "all" 
  });
};
