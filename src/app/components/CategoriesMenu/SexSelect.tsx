
interface SexSelectProps {
  value: string | null;
  onChange: (value: string) => void;
}

const SexSelect: React.FC<SexSelectProps> = ({ value, onChange }) => {

  const values = [
    { title: 'Мужской', value: "MALE" },
    { title: 'Женский', value: "FEMALE" },
    { title: 'Унисекс', value: "GENERAL" }
  ]
  const selectedValue = value ?? "GENERAL";
  if (value === null) {
    onChange("GENERAL");
  }

  return (
    <div className="w-full max-w-sm">
      <label htmlFor="sex" className="block text-sm font-medium mb-1">
        Выберите пол:
      </label>
      <select
        id="sex"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {values.map((sex) => (
          <option key={sex.value} value={sex.value}>
            {sex.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SexSelect;
