import React from 'react';

interface Category {
  id: number;
  name: string;
  image: string;
  bgColor: string;
}

interface Props {
  category: Category;
}

const CategoryCard: React.FC<Props> = ({ category }) => {
  return (
    <div className={`${category.bgColor} rounded-lg p-6 text-center cursor-pointer hover:scale-105 transition-transform`}>
      <div className="text-5xl mb-3">{category.image}</div>
      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
    </div>
  );
};

export default CategoryCard;
