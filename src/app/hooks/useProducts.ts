import { useMutation, useQuery } from '@apollo/client/react';
import { GET_PRODUCT, GET_PRODUCT_IMAGES, GET_PRODUCTS } from '../graphql/queries';
import { ADD_OR_UPDATE_IMAGE_PRODUCT, ADMIN_ADD_PRODUCT, DELETE_PRODUCT, DELETE_PRODUCT_IMAGE, UPDATE_PRODUCT, UPDATE_PRODUCT_IMAGE } from '../graphql/mutations';

export interface ProductInput {
  name: string,
  cost: number,
  categoryId: number,
  brandId: number,
  article: string,
  discount: number,
  description: string,
  aromNote: string | null,
  volume: number,
  count: number
}

// Хук для получения списка продуктов
export const useProducts = () => {
  return useQuery(GET_PRODUCTS, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};
export const useProductImages = (productId: number) => {
  return useQuery(GET_PRODUCT_IMAGES, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    variables: { filters: { productId: { equals: productId } } },
  });
};
export const useProduct = (productId: number | null) => {
  return useQuery(GET_PRODUCT, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    variables: { productId },
    skip: productId == null,
  });
};

export const useAddProduct = () => {
  return useMutation(ADMIN_ADD_PRODUCT, { errorPolicy: "all" });
};

export const useAddOrUpdateImageProduct = () => {
  return useMutation(ADD_OR_UPDATE_IMAGE_PRODUCT, { errorPolicy: "all" });
};
export const useDeleteProductImage = () => {
  return useMutation(DELETE_PRODUCT_IMAGE, { errorPolicy: "all" });
};
export const useUpdateProductImage = () => {
  return useMutation(UPDATE_PRODUCT_IMAGE, { errorPolicy: "all" });
};
export const useUpdateProduct = () => {
  return useMutation(UPDATE_PRODUCT, { errorPolicy: "all" });
};
export const useDeleteProduct = () => {
  return useMutation(DELETE_PRODUCT, { errorPolicy: "all" });
};