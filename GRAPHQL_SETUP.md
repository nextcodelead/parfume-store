# GraphQL Integration Setup - Полная интеграция

## Что было сделано

1. **Apollo Client настроен** - подключение к GraphQL endpoint: `https://dataset.uz/graphql`
2. **ApolloProvider создан** - провайдер для всего приложения
3. **Layout обновлен** - ApolloProvider интегрирован в корневой layout
4. **Полная структура GraphQL** - queries, mutations, enums
5. **Кастомные хуки** - для всех основных операций
6. **Тестовые компоненты** - ProductList, CartView, Profile, Orders
7. **Демо-интерфейс** - GraphQLDemo для тестирования всех функций

## Структура файлов

```
src/app/
├── appoloClient.js          # Продвинутая конфигурация Apollo Client
├── components/
│   ├── ApolloProvider.tsx   # GraphQL провайдер
│   ├── GraphQLDemo.tsx      # Демо-интерфейс
│   ├── ProductList.tsx      # Список продуктов
│   ├── CartView.tsx         # Корзина пользователя
│   ├── Profile.tsx          # Профиль пользователя
│   └── Orders.tsx           # Заказы пользователя
├── graphql/
│   ├── queries.ts           # GraphQL запросы
│   ├── mutations.ts         # GraphQL мутации
│   └── enums.ts             # Константы и енумы
└── hooks/
    ├── useProducts.ts       # Хуки для работы с продуктами
    ├── useCategories.ts     # Хуки для работы с категориями
    ├── useUserCart.ts       # Хуки для работы с корзиной
    ├── useCreateOrder.ts    # Хуки для работы с заказами
    └── useUpdateUser.ts     # Хуки для работы с пользователями
```

## Как использовать

### 1. Базовое использование с useQuery

```tsx
import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
    }
  }
`;

function ProductList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;
  
  return (
    <div>
      {data.products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### 2. Использование кастомных хуков

```tsx
import { useProducts } from '../hooks/useProducts';

function ProductList() {
  const { data, loading, error } = useProducts('women', 10, 0);
  
  // ... остальная логика
}
```

### 3. Мутации

```tsx
import { useMutation } from '@apollo/client';
import { ADD_TO_CART } from '../graphql/queries';

function AddToCartButton({ productId }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART);
  
  const handleAddToCart = async () => {
    try {
      await addToCart({
        variables: { productId, quantity: 1 }
      });
      console.log('Товар добавлен в корзину!');
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  
  return (
    <button onClick={handleAddToCart} disabled={loading}>
      Добавить в корзину
    </button>
  );
}
```

## Следующие шаги

1. **Замените примеры запросов** в `src/app/graphql/queries.ts` на реальную схему вашего бекенда
2. **Обновите GraphQLTest компонент** с реальными запросами
3. **Интегрируйте GraphQL** в существующие компоненты (ProductCard, CartItem, etc.)
4. **Добавьте обработку ошибок** и loading состояний
5. **Настройте кэширование** для оптимизации производительности

## Проверка подключения

Запустите приложение и откройте главную страницу. Вы должны увидеть секцию "GraphQL Test" с результатами подключения к вашему GraphQL endpoint.

## Troubleshooting

- Убедитесь, что GraphQL endpoint доступен: `https://dataset.uz/graphql`
- Проверьте CORS настройки на бекенде
- Откройте Developer Tools для просмотра ошибок в консоли
- Проверьте Network tab для GraphQL запросов
