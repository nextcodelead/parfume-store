import { gql } from '@apollo/client';

// Запрос для получения всех продуктов (ИСПРАВЛЕННЫЙ)
export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
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
  query GetCategories {
    categories {
      pk
      name
    }
  }
`;