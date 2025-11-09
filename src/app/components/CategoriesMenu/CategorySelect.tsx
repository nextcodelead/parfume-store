import { useSelectCategories } from "@/app/hooks/useCategories";

interface CategorySelectProps {
  value: number | null;
  onChange: (value: number) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange }) => {
  const { data, loading, error } = useSelectCategories();
  const categories = data?.categories || [];

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;
  const selectedValue = value ?? (categories.length > 0 ? Number(categories[0].pk) : "");
  if (value === null && categories.length > 0) {
    onChange(Number(categories[0].pk));
  }

  return (
    <div className="w-full max-w-sm">
      <label htmlFor="category" className="block text-sm font-medium mb-1">
        Выберите категорию:
      </label>
      <select
        id="category"
        value={selectedValue}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map((category) => (
          <option key={category.pk} value={category.pk}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
