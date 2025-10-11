export type CartItemType = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: React.ReactNode;
  size: string;
  quantity: number;
  inStock: boolean;
};

export const CART_ITEMS: CartItemType[] = [
  {
    id: 1,
    name: "Бархатная роза",
    brand: "Essence Luxe",
    price: 89.99,
    image: "🌹",
    size: "100 мл",
    quantity: 2,
    inStock: true
  },
  {
    id: 2,
    name: "Морской бриз",
    brand: "Essence Luxe",
    price: 75.00,
    image: "🌊",
    size: "50 мл",
    quantity: 1,
    inStock: true
  },
  {
    id: 3,
    name: "Полуночный нуар",
    brand: "Essence Luxe",
    price: 95.00,
    image: "🌙",
    size: "100 мл",
    quantity: 1,
    inStock: false
  }
];
