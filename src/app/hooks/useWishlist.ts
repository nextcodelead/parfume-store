import { useMutation, useQuery } from '@apollo/client/react';
import { GET_WISHLIST } from '../graphql/queries';
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../graphql/mutations';
import { useIsClient } from './useIsClient';

export interface WishlistItem {
  pk: number;
  product: {
    pk: number;
    name: string;
    description: string;
    photo?: {
      imageUrl: string;
    };
    brand: {
      pk: number;
      name: string;
    };
    category: {
      pk: number;
      name: string;
    };
    stocks: {
      pk: number;
      cost: number;
      discount: number;
      quantity: number;
      size: string;
      unit: string;
      volume: number;
    }[];
  };
}

interface WishlistResponse {
  me: {
    wishlist: WishlistItem[];
  };
}

export const useWishlist = () => {
  const isClient = useIsClient();
  
  const { data, loading, error, refetch } = useQuery<WishlistResponse>(GET_WISHLIST, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    skip: !isClient,
  });

  const [addToWishlist] = useMutation(ADD_TO_WISHLIST, {
    errorPolicy: 'all',
    refetchQueries: [{ query: GET_WISHLIST }],
  });

  const [removeFromWishlist] = useMutation(REMOVE_FROM_WISHLIST, {
    errorPolicy: 'all',
    refetchQueries: [{ query: GET_WISHLIST }],
  });

  const addProduct = async (productId: number) => {
    try {
      await addToWishlist({
        variables: { productId },
      });
      await refetch();
    } catch (err) {
      console.error('Ошибка при добавлении в избранное:', err);
      throw err;
    }
  };

  const removeProduct = async (wishlistItemPk: number) => {
    try {
      await removeFromWishlist({
        variables: { pk: wishlistItemPk },
      });
      await refetch();
    } catch (err) {
      console.error('Ошибка при удалении из избранного:', err);
      throw err;
    }
  };

  const removeProductById = async (productId: number) => {
    try {
      const wishlistItem = data?.me?.wishlist?.find(item => item.product.pk === productId);
      if (wishlistItem) {
        await removeFromWishlist({
          variables: { pk: wishlistItem.pk },
        });
        await refetch();
      }
    } catch (err) {
      console.error('Ошибка при удалении из избранного:', err);
      throw err;
    }
  };

  const isInWishlist = (productId: number): boolean => {
    return data?.me?.wishlist?.some(item => item.product.pk === productId) ?? false;
  };

  return {
    wishlist: data?.me?.wishlist ?? [],
    loading,
    error,
    addProduct,
    removeProduct,
    removeProductById,
    isInWishlist,
    refetch,
  };
};

