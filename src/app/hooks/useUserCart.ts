import { useQuery, useMutation } from '@apollo/client/react';
import { GET_USER_CART } from '../graphql/queries';
import { ADD_PRODUCT_TO_USER_CART, REMOVE_ALL_PRODUCTS_FROM_USER_CART, REMOVE_PRODUCT_FROM_USER_CART } from '../graphql/mutations';
import { useIsClient } from './useIsClient';

// Типы для удобства использования
export interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    inStock: boolean;
  };
}

export interface UserCart {
  id: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface UserCartResponse {
  userCart: UserCart;
}

export interface AddToCartResponse {
  addProductToUserCart: {
    success: boolean;
    message: string;
    cartItem: CartItem;
  };
}

export interface RemoveFromCartResponse {
  removeProductFromUserCart: {
    success: boolean;
    message: string;
  };
}

export interface RemoveAllFromCartResponse {
  removeAllProductsFromUserCart: {
    success: boolean;
    message: string;
  };
}

// Хук для получения корзины пользователя
export const useUserCart = () => {
  const isClient = useIsClient();
  return useQuery<UserCartResponse>(GET_USER_CART, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    pollInterval: 30000,
    skip: !isClient,
  });
};

export const useRemoveAllFromCart = () => {
  return useMutation<RemoveAllFromCartResponse>(REMOVE_ALL_PRODUCTS_FROM_USER_CART, { 
    errorPolicy: "all" 
  });
};

export const useRemoveProductFromCart = () => {
  return useMutation<RemoveFromCartResponse>(REMOVE_PRODUCT_FROM_USER_CART, { 
    errorPolicy: "all" 
  });
};

// Хук для добавления продукта в корзину
export const useAddToCart = () => {
  const [addToCartMutation, { loading, error }] = useMutation<AddToCartResponse>(ADD_PRODUCT_TO_USER_CART, {
    refetchQueries: [GET_USER_CART],
    errorPolicy: 'all',
  });

  const addToCart = async (productId: number, count: number = 1) => {
    try {
      const result = await addToCartMutation({
        variables: { productId, count },
      });
      return result.data?.addProductToUserCart; // Теперь это свойство существует
    } catch (err) {
      console.error('Error adding to cart:', err);
      throw err;
    }
  };

  return {
    addToCart,
    loading,
    error,
  };
};