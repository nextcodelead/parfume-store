// Простой хук с тестовыми данными
export const useTestProducts = () => {
  const testProducts = [
    { id: 1, name: "Chanel №5", price: 7500, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Dior Sauvage", price: 8200, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Gucci Bloom", price: 6900, image: "https://via.placeholder.com/150" }
  ];

  return { 
    data: { products: testProducts }, 
    loading: false, 
    error: undefined 
  };
};