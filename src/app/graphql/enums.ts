// GraphQL Enums для парфюмерного магазина

export enum OrderStatusEnum {
  PENDING = 'PENDING',
  PAID = 'PAID',
  DELIVERED = 'DELIVERED'
}

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum SexEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

// Дополнительные типы для удобства работы
export type OrderStatus = keyof typeof OrderStatusEnum;
export type UserRole = keyof typeof UserRoleEnum;
export type Sex = keyof typeof SexEnum;
