import { gql } from '@apollo/client';



// Запрос для получения конкретного продукта (ИСПРАВЛЕННЫЙ)
export const GET_PRODUCTS = gql`
  query GetProducts($filters: ProductFilter, $pagination: PaginationInput) {
    products(filters: $filters, pagination: $pagination) {
      pk
      name
      article
      cost
      discount
      photo {
        imageUrl
      }
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

export const GET_PRODUCTS_BY_PROMOTION = gql`
  query byPromotion($filters: ProductFilter, $pagination: PaginationInput) {
    byPromotion(filters: $filters, pagination: $pagination) {
      pk
      photo {
        imageUrl
      }
      discount
      name
      cost
    }
  }
`;


export const GET_PRODUCTS_ADMIN = gql`
  query byPromotion ($filters: ProductFilter, $pagination: PaginationInput) {
    products(filters: $filters, pagination: $pagination) {
      pk
      name
      category {
        name
      }
      photo {
        imageUrl
      }
      count
      countCells
      status
    }
  }
`;
export const GET_PRODUCTS_COUNT_ADMIN = gql`
  query byPromotion ($filters: ProductFilter) {
    productsCount(filters: $filters)
  }
`;

export const ADMIN_CREATE_PRODUCT_SELECT_CATEGORY = gql`
  query categories {
    categories {
      pk
      name
    }
  }
`;
export const ADMIN_CREATE_PRODUCT_SELECT_BRAND = gql`
  query brands {
    brands {
      pk
      name
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

export const GET_PRODUCT_IMAGES = gql` 
  query getImages($filters: ProductImageFilter) {
    productImages(filters: $filters) {
      pk
      asMain
      imageUrl
    }
  }
`;
export const GET_PRODUCT = gql` 
  query ($productId: Int!) {
    product(id: $productId) {
      pk
      aromNote
      brandId
      categoryId
      description
      index
      isPublished
      name
      sex
      showAtMain
    }
  }
`;

export const GET_STOCKS = gql` 
  query stocks($filters: StockFilter) {
    stocks(filters: $filters) {
      pk
      article
      cost
      discount
      productId
      quantity
      size
      unit
      volume
      weight
    }
  }
`;
export const GET_STOCK = gql` 
  query($stockId: Int!) {
    stock(id: $stockId) {
      pk
      article
      cost
      discount
      productId
      quantity
      size
      unit
      volume
      weight
    }
  }
`;
export const GET_PRODUCT_CLIENT = gql` 
  query($productId: Int!) {
    product(id: $productId) {
      brand {
        name
      }
      categoryRoute {
        name
      }
      starsRating
      name
      countReviews
      description
      aromNote
      stocks {
        pk
        article
        volume
        unit
        quantity
        cost
        discount
      }
    }
  }
`;
export const GET_PRODUCT_IMAGES_CLIENT = gql` 
  query($productId: Int!) {
    product(id: $productId) {
      images {
        asMain
        imageUrl
      }
    }
  }
`;