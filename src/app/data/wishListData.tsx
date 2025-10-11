export type WishItemType = {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  inStock: boolean;
  discount?: number
};

export const WISHLIST_ITEMS: WishItemType[] = [
  {
    id: 4,
    name: "Золотой Янтарь",
    brand: "Essence Luxe",
    price: 120.00,
    oldPrice: 150.00,
    image: "✨",
    rating: 5.0,
    inStock: true,
    discount: 20
  },
  {
    id: 5,
    name: "Цветущая Вишня",
    brand: "Essence Luxe",
    price: 82.00,
    image: "🌸",
    rating: 4.7,
    inStock: true
  },
  {
    id: 6,
    name: "Лавандовый Туман",
    brand: "Essence Luxe",
    price: 70.00,
    image: "💜",
    rating: 4.8,
    inStock: false
  },
  {
    id: 7,
    name: "Белый Чай",
    brand: "Essence Luxe",
    price: 78.00,
    image: "🍵",
    rating: 4.5,
    inStock: true
  }
];
