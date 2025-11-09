import { useState } from "react";

const CategorySelect = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = ["Perfume", "Makeup", "Skincare", "Haircare"];

  return (
    <div className="w-full max-w-sm">
      <label htmlFor="category" className="block text-sm font-medium mb-1">
        Choose category:
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <p className="mt-2 text-sm text-gray-700">
          Selected: <strong>{selectedCategory}</strong>
        </p>
      )}
    </div>
  );
};

export default CategorySelect;
