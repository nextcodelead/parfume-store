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
  mutation AddProductToUserCart($productId: ID!, $quantity: Int!) {
    addProductToUserCart(productId: $productId, quantity: $quantity) {
      success
      message
      cartItem {
        id
        quantity
        product {
          id
          name
          price
          image
        }
      }
    }
  }
`;

// Мутация для создания заказа
export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      success
      message
      order {
        id
        orderNumber
        status
        totalAmount
        createdAt
        items {
          id
          quantity
          price
          product {
            pk
            name
            price
            image
          }
        }
      }
    }
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
