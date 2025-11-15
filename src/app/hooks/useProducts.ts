import { useMutation, useQuery } from '@apollo/client/react';
import { GET_PRODUCT, GET_PRODUCT_CLIENT, GET_PRODUCT_IMAGES, GET_PRODUCT_IMAGES_CLIENT, GET_PRODUCTS, GET_STOCK, GET_STOCKS } from '../graphql/queries';
import { ADD_OR_UPDATE_IMAGE_PRODUCT, ADD_STOCK, ADMIN_ADD_PRODUCT, DELETE_PRODUCT, DELETE_PRODUCT_IMAGE, DELETE_STOCK, UPDATE_PRODUCT, UPDATE_PRODUCT_IMAGE, UPDATE_STOCK } from '../graphql/mutations';

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
export const useProductStocks = (productId: number) => {
  return useQuery(GET_STOCKS, {
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
export const useProductClient = (productId: number) => {
  return useQuery(GET_PRODUCT_CLIENT, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    variables: { productId },
  });
};
export const useProductImagesClient = (productId: number) => {
  return useQuery(GET_PRODUCT_IMAGES_CLIENT, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    variables: { productId },
  });
};
export const useStock = (stockId: number | null) => {
  return useQuery(GET_STOCK, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    variables: { stockId },
    skip: stockId == null,
  });
};

export const useAddProduct = () => {
  return useMutation(ADMIN_ADD_PRODUCT, { errorPolicy: "all" });
};
export const useAddStock = () => {
  return useMutation(ADD_STOCK, { errorPolicy: "all" });
};
export const useUpdateStock = () => {
  return useMutation(UPDATE_STOCK, { errorPolicy: "all" });
};

export const useAddOrUpdateImageProduct = () => {
  return useMutation(ADD_OR_UPDATE_IMAGE_PRODUCT, { errorPolicy: "all" });
};
export const useDeleteProductImage = () => {
  return useMutation(DELETE_PRODUCT_IMAGE, { errorPolicy: "all" });
};
export const useDeleteStock = () => {
  return useMutation(DELETE_STOCK, { errorPolicy: "all" });
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