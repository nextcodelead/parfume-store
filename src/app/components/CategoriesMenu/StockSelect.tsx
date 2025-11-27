import { useEffect, useRef, useState } from "react";
import { useStocks } from "@/app/hooks/useStocks";
import { Stock } from "@/app/types/graphql";


interface StockSelectProps {
  productId: number;
  onChange: (stock: Stock) => void;
}

const StockSelect: React.FC<StockSelectProps> = ({ productId, onChange }) => {
  console.log("productId:", productId);
  const { data, loading, error } = useStocks(productId);
  const stocks: Stock[] = data?.stocks || [];

  // локальный selected pk, чтобы select действительно менялся
  const [selectedPk, setSelectedPk] = useState<number | "">("");
  // флаг, чтобы onChange дефолтный вызывался только один раз при первой загрузке
  const calledRef = useRef(false);
  // чтобы реагировать на смену productId и позволить повторно установить дефолт
  const prevProductRef = useRef<number | null>(null);

  // сбрасываем calledRef, когда productId изменился
  useEffect(() => {
    if (prevProductRef.current !== productId) {
      calledRef.current = false;
      prevProductRef.current = productId;
      setSelectedPk("");
    }
  }, [productId]);

  useEffect(() => {
    if (!calledRef.current && stocks.length > 0) {
      const first = stocks[0];
      setSelectedPk(first.pk);
      try {
        onChange(first);
      } catch (err) {
        console.warn("onChange threw:", err);
      }
      calledRef.current = true;
    }
    // если stocks опустели — сбрасываем selectedPk
    if (stocks.length === 0) {
      setSelectedPk("");
    }
  }, [stocks, onChange]);

  if (loading) return <p>Loading stocks...</p>;
  if (error) return <p>Error loading stocks: {error.message}</p>;

  const getByPk = (pk: number) => {
    return stocks.find((s) => s.pk === pk) ?? null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pk = Number(e.target.value);
    setSelectedPk(pk);
    const stock = getByPk(pk);
    if (stock) {
      onChange(stock);
    } else {
      console.warn("Selected stock not found for pk:", pk);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <label htmlFor="stock" className="block text-sm font-medium mb-1">
        Выберите размер:
      </label>
      <select
        id="stock"
        value={selectedPk}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {stocks.length === 0 && <option value="">Нет в наличии</option>}
        {stocks.map((stock) => (
          <option key={stock.pk} value={stock.pk}>
            {stock.size} {stock.unit}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StockSelect;
