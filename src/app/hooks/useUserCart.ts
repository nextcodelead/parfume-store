import { useQuery, useMutation } from '@apollo/client/react';
import { GET_USER_CART } from '../graphql/queries';
import { ADD_PRODUCT_TO_USER_CART } from '../graphql/mutations';
import { useIsClient } from './useIsClient';

// Хук для получения корзины пользователя
export const useUserCart = () => {
  const isClient = useIsClient();
  return useQuery(GET_USER_CART, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    pollInterval: 30000, // Обновляем корзину каждые 30 секунд
    skip: !isClient,
  });
};

// Хук для добавления продукта в корзину
export const useAddToCart = () => {
  const [addToCartMutation, { loading, error }] = useMutation(ADD_PRODUCT_TO_USER_CART, {
    refetchQueries: [GET_USER_CART],
    errorPolicy: 'all',
  });

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const result = await addToCartMutation({
        variables: { productId, quantity },
      });
      return result.data?.addProductToUserCart;
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
  success: boolean;
  message: string;
  cartItem: CartItem;
}
