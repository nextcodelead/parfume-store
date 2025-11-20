// hooks/useAllProducts.ts
import { useQuery } from '@apollo/client/react';
import { GET_PRODUCTS } from '../graphql/queries';
import { useIsClient } from './useIsClient';

export const useAllProducts = () => {
  const isClient = useIsClient();
  
  return useQuery(GET_PRODUCTS, {
    variables: {
      filters: {
        isPublished: {
          equals: true
        },
        showAtMain: {
          equals: true
        }
      }, 
      pagination: { limit: 20 }
    },
    skip: !isClient
  });
};
export const useNewProducts = () => {
  const isClient = useIsClient();
  
  return useQuery(GET_PRODUCTS, {
    variables: {
      filters: {
        isPublished: {
          equals: true
        },
        showAtMain: {
          equals: true
        }
      },
      pagination: { limit: 4 },
      ordering: {
        createdAt: "DESC"
      }
    },
    skip: !isClient
  });
};