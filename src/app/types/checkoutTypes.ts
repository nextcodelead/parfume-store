export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  apartment: string;
  zipCode: string;
  deliveryNote: string;
  saveAddress: boolean;
}

export interface FormErrors {
  [key: string]: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

export interface DeliveryMethod {
  id: string;
  name: string;
  price: number;
  time: string;
  icon: React.ReactNode;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}