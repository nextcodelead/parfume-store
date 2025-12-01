import { useQuery } from '@apollo/client/react';
import { ADMIN_CREATE_PRODUCT_SELECT_BRAND } from '../graphql/queries';
import { useIsClient } from './useIsClient';

interface Brand {
  pk: number;
  name: string;
}

interface SelectBrandsData {
  brands: Brand[];
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
