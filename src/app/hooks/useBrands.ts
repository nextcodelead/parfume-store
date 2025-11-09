import { useQuery } from '@apollo/client/react';
import { ADMIN_CREATE_PRODUCT_SELECT_BRAND } from '../graphql/queries';
import { useIsClient } from './useIsClient';



export const useSelectBrands = () => {
  const isClient = useIsClient();
  return useQuery(ADMIN_CREATE_PRODUCT_SELECT_BRAND, {
    variables: {},
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    skip: !isClient,
  });
};