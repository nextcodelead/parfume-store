import { gql } from '@apollo/client';

// GraphQL Mutations для парфюмерного магазина (обновлены под реальную схему)

// Мутация для добавления продукта в корзину пользователя
export const ADMIN_ADD_PRODUCT = gql`
  mutation addProduct($input: ProductInput!) {
    addProduct(input: $input) {
      pk
    }
  }
`;

export const ADD_PRODUCT_TO_USER_CART = gql`
  mutation addProductToUserCart($productId: Int!, $count: Int!) {
    addProductToUserCart(productId: $productId, count: $count) {
      pk
    }
  }
`;
export const REMOVE_ALL_PRODUCTS_FROM_USER_CART = gql`
  mutation removeAllProductsFromUserCart {
    removeAllProductsFromUserCart
  }
`;
export const REMOVE_PRODUCT_FROM_USER_CART = gql`
  mutation removeProductFromUserCart($pk: Int!) {
    removeProductFromUserCart(pk: $pk)
  }
`;

export const addProduct = gql`
  mutation($input: ProductInput!) {
  addProduct(input: $input) {
    pk
  }
}
  `

// Мутация для обновления данных пользователя
export const UPDATE_ME = gql`
  mutation UpdateMe($input: UpdateUserInput!) {
    updateMe(input: $input) {
      success
      message
      user {
        pk
        email
        firstName
        lastName
        phone
        sex
        dateOfBirth
        avatar
      }
    }
  }
`;

// Мутация для обновления пользователя (админ)
export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      success
      message
      user {
        id
        email
        firstName
        lastName
        phone
        role
        sex
        dateOfBirth
        avatar
      }
    }
  }
`;

export const ADD_OR_UPDATE_IMAGE_PRODUCT = gql`
  mutation($pk: Int, $input: ProductImageInput!) {
    addOrUpdateImageProduct(pk: $pk, input: $input) {
      pk
      imageUrl
      asMain
    }
  }
`;
export const DELETE_PRODUCT_IMAGE = gql`
  mutation($pk: Int!) {
    deleteProductImage(pk: $pk) {
      pk
    }
  }
`;

export const UPDATE_PRODUCT_IMAGE = gql`
  mutation($pk: Int!, $input: ProductImageInput!) {
    updateProductImage(pk: $pk, input: $input) {
      pk
    }
  }
`;
export const UPDATE_PRODUCT = gql`
  mutation($pk: Int!, $input: ProductInput!) {
    updateProduct(pk: $pk, input: $input) {
      pk
    }
  }
`;
export const DELETE_PRODUCT = gql`
  mutation($pk: Int!) {
    deleteProduct(pk: $pk) {
      pk
    }
  }
`;
export const DELETE_STOCK = gql`
  mutation($pk: Int!) {
    deleteStock(pk: $pk) {
      pk
    }
  }
`;
export const ADD_STOCK = gql`
  mutation($input: StockInput!) {
    addStock(input: $input) {
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
export const UPDATE_STOCK = gql`
  mutation($pk: Int!, $input: StockInput!) {
    updateStock(pk: $pk, input: $input) {
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

export const BEGIN_BUY = gql`
  mutation beginBuy($products: [OrderCartInput!]!) {
    beginBuy(products: $products)
  }
`;

export const CREATE_ORDER = gql`
  mutation($pk: Int, $order: OrderInput!) {
    createUpdateOrder(pk: $pk, order: $order) {
      pk
    }
  }
`;
export const ADD_BRAND = gql`
  mutation addBrand($input: BrandInput!) {
    addBrand(input: $input) {
      pk
      name
      siteUrl
    }
  }
`;
export const UPDATE_BRAND = gql`
  mutation updateBrand($pk: Int!, $input: BrandInput!) {
    updateBrand(pk: $pk, input: $input) {
      pk
      name
      siteUrl
    }
  }
`;
export const DELETE_BRAND = gql`
  mutation($pk: Int!) {
    deleteBrand(pk: $pk) {
      pk
    }
  }
`;
export const ADD_CATEGORY = gql`
  mutation addCategory($input: CategoryInput!) {
    addCategory(input: $input) {
      pk
      name
      description
    }
  }
`;
export const DELETE_CATEGORY = gql`
  mutation($pk: Int!) {
    deleteCategory(pk: $pk) {
      pk
    }
  }
`;
export const UPDATE_CATEGORY = gql`
  mutation($pk: Int!, $input: CategoryInput!) {
    updateCategory(pk: $pk, input: $input) {
      pk
      name
      description
    }
  }
`;
