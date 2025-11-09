import { useSelectBrands } from "@/app/hooks/useBrands";

interface BrandSelectProps {
  value: number | null;
  onChange: (value: number) => void;
}

const BrandSelect: React.FC<BrandSelectProps> = ({ value, onChange }) => {
  const { data, loading, error } = useSelectBrands();
  const brands = data?.brands || [];

  if (loading) return <p>Loading Brands...</p>;
  if (error) return <p>Error loading Brands: {error.message}</p>;
  const selectedValue = value ?? (brands.length > 0 ? Number(brands[0].pk) : "");
  if (value === null && brands.length > 0) {
    onChange(Number(brands[0].pk));
  }

  return (
    <div className="w-full max-w-sm">
      <label htmlFor="brand" className="block text-sm font-medium mb-1">
        Выберите бренд:
      </label>
      <select
        id="brand"
        value={selectedValue}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {brands.map((brand) => (
          <option key={brand.pk} value={brand.pk}>
            {brand.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BrandSelect;
