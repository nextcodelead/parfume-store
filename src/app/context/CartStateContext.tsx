'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { ADD_PRODUCT_TO_USER_CART } from '../graphql/mutations';
import { ME_MAIN, ME_USER_CART } from '../graphql/queries';
import { useMeUserCart } from '../hooks/useMe';

type CartStateContextValue = {
  productIdsInCart: number[];
  addingProductId: number | null;
  addToCart: (productId: number, count?: number) => Promise<void>;
};

const CartStateContext = createContext<CartStateContextValue | null>(null);

export function CartStateProvider({ children }: { children: React.ReactNode }) {
  const { data, refetch } = useMeUserCart();
  const [addingProductId, setAddingProductId] = useState<number | null>(null);

  const productIdsInCart = useMemo(() => {
    const cart = (data?.me as { userCart?: { product: { pk: number } }[] } | undefined)?.userCart;
    if (!Array.isArray(cart)) return [];
    return cart.map((item) => item.product.pk);
  }, [data?.me]);

  const [addToCartMutation] = useMutation(ADD_PRODUCT_TO_USER_CART, {
    refetchQueries: [ME_USER_CART, ME_MAIN],
    errorPolicy: 'all',
  });

  const addToCart = useCallback(
    async (productId: number, count: number = 1) => {
      if (addingProductId !== null) return;
      setAddingProductId(productId);
      try {
        await addToCartMutation({ variables: { productId, count } });
        await refetch();
      } catch (err) {
        console.error('Error adding to cart:', err);
      } finally {
        setAddingProductId(null);
      }
    },
    [addToCartMutation, addingProductId, refetch]
  );

  const value = useMemo<CartStateContextValue>(
    () => ({ productIdsInCart, addingProductId, addToCart }),
    [productIdsInCart, addingProductId, addToCart]
  );

  return <CartStateContext.Provider value={value}>{children}</CartStateContext.Provider>;
}

export function useCartState() {
  const ctx = useContext(CartStateContext);
  if (!ctx) {
    throw new Error('useCartState must be used within CartStateProvider');
  }
  return ctx;
}

/** Использовать в компонентах, где провайдер может отсутствовать (например ProductCard) */
export function useCartStateOptional(): CartStateContextValue | null {
  return useContext(CartStateContext);
}
