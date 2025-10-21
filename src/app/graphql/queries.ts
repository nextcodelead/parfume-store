import { gql } from '@apollo/client';



// Запрос для получения конкретного продукта (ИСПРАВЛЕННЫЙ)
export const GET_PRODUCT = gql`
  query GetProduct($pk: Int!) {
    product(pk: $pk) {
      pk
      name
      article
      cost
      discount
      photoUrl
      description
      isPublished
      brand {
        pk
        name
      }
      category {
        pk
        name
      }
      images {
        pk
        imageUrl  # ✅ исправлено с url на imageUrl
        asMain
      }
      stocks {
        pk
        quantity
        # size может называться иначе, пока уберем
      }
    }
  }
`;

// Запрос для получения всех брендов
export const GET_BRANDS = gql`
  query GetBrands {
    brands {
      pk
      name
    }
  }
`;

// Запрос для получения всех категорий
export const GET_CATEGORIES = gql`
  query categories($filter: CategoryFilter) {
    categories(filters: $filter) {
      pk
      iconUrl
      name
      children {
        pk
        name
        groupName
      }
    }
  }
`;
export const GET_PRODUCTS = gql`
  query byPromotion ($filters: ProductFilter, $pagination: PaginationInput) {
    products(filters: $filters, pagination: $pagination) {
      pk
      photoUrl
      discount
      name
      cost
    }
  }
`;






// TODO проверить и исправить под реальную схему
export const GET_USER_CART = gql` 
  query categories($filter: CategoryFilter) {
    categories(filters: $filter) {
      pk
      iconUrl
      name
    }
  }
`;
// TODO проверить и исправить под реальную схему
export const GET_ORDERS = gql` 
  query categories($filter: CategoryFilter) {
    categories(filters: $filter) {
      pk
    }
  }
`;
// TODO проверить и исправить под реальную схему
export const GET_ME = gql` 
  query categories($filter: CategoryFilter) {
    categories(filters: $filter) {
      pk
    }
  }
`;