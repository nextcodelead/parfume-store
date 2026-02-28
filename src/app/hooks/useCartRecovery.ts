import { useCallback } from 'react';
import { useAddToCart } from './useUserCart';

interface BackupItem {
  product?: { pk: number; name?: string };
  stock?: { pk: number };
  count?: number;
}

export const useCartRecovery = () => {
  const { addToCart } = useAddToCart();

  const restoreCartFromBackup = useCallback(async (currentCartLength: number) => {
    if (typeof window === 'undefined') return;

    const isReturningFromCheckout = sessionStorage.getItem('isReturningFromCheckout') === 'true';
    
    // Восстанавливаем только если вернулись из оформления И корзина пуста
    if (!isReturningFromCheckout || currentCartLength > 0) {
      // Очищаем флаги если не нужно восстанавливать
      sessionStorage.removeItem('isReturningFromCheckout');
      sessionStorage.removeItem('cartBackup');
      return;
    }

    const backup = sessionStorage.getItem('cartBackup');
    if (!backup) return;

    try {
      const items: BackupItem[] = JSON.parse(backup);
      console.log('Восстановление корзины: начинаю восстанавливать товары', items.length);

      // Восстанавливаем товары с небольшой задержкой между ними
      for (const item of items) {
        if (item.product?.pk) {
          try {
            console.log(`Добавляю ${item.product.name} (pk=${item.product.pk})`);
            await addToCart(item.product.pk, item.count || 1);
            // Задержка между добавлениями
            await new Promise(resolve => setTimeout(resolve, 250));
          } catch (err) {
            console.error(`Ошибка при добавлении товара ${item.product.pk}:`, err);
          }
        }
      }

      // Очищаем после успешного восстановления
      sessionStorage.removeItem('isReturningFromCheckout');
      sessionStorage.removeItem('cartBackup');
    } catch (err) {
      console.error('Ошибка при восстановлении корзины:', err);
      // Очищаем флаги даже при ошибке
      sessionStorage.removeItem('isReturningFromCheckout');
      sessionStorage.removeItem('cartBackup');
    }
  }, [addToCart]);

  return { restoreCartFromBackup };
};
