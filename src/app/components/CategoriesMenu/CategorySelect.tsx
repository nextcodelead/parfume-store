import { useEffect } from "react";
import { useSelectCategories } from "@/app/hooks/useCategories";
import type { Category } from "@/app/hooks/useCategories";
import { useState } from "react";

interface CategorySelectProps {
  canClear?: boolean;
  excludes: number[];
  value: number | null;
  onChange: (value: number | null) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ canClear = false, excludes = [], value, onChange }) => {
  const { data, loading, error } = useSelectCategories();
  const additionalEmptyForSelect = canClear ? [{pk: -1, name: "Ничего"} as Category] : [];
  const categories = additionalEmptyForSelect.concat(data?.categories.filter(category => !excludes.includes(category.pk)) || []);
  const [selectedValue, setSelectedValue] = useState<number>(-1);

  // Установить значение по умолчанию только один раз при монтировании, если значение не задано
  useEffect(() => {
    if (value === null && categories.length > 0) {
      onChange(Number(categories[0].pk));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length]); // Запускать только когда категории загружены (onChange не включаем в зависимости, так как это стабильная функция)

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;
  if(!canClear) {
    const tmp = value ?? (categories.length > 0 ? Number(categories[0].pk) : -1);
    if (selectedValue !== tmp) {
      setSelectedValue(tmp);
    }
    if (value === null && categories.length > 0) {
      onChange(Number(categories[0].pk));
    }
  }
  if(value != null) {
    if (selectedValue !== value) {
      setSelectedValue(value);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <label htmlFor="category" className="block text-sm font-medium mb-1">
        Выберите категорию:
      </label>
      <select
        id="category"
        value={selectedValue!}
        onChange={(e) => onChange(+e.target.value != -1 ? Number(e.target.value) : null)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map((category: Category) => (
          <option key={category.pk} value={category.pk}>
            {category.name}
          </option>
        ))}
      </select>
      {canClear && (
        <button 
          type="button"
          className="mt-2 text-sm text-red-500 hover:underline"
          onClick={() => {
            setSelectedValue(-1);
            onChange(null);
          }}
        >
          Очистить выбор
        </button>
      )}
    </div>
  );
};

export default CategorySelect;
