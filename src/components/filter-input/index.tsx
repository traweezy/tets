import { useEffect, useState } from 'react';

interface FilterInputProps {
  onChangeCallback: (value: string) => void;
  mode: 'dark' | 'light';
  placeholder: string;
}

const FilterInput = ({
  onChangeCallback,
  mode,
  placeholder,
}: FilterInputProps) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    onChangeCallback(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const modeClasses =
    mode === 'dark' ? 'bg-dark-gray text-white' : 'bg-gray-100 text-gray-800';

  return (
    <input
      className={`w-full p-2 text-sm rounded-lg ${modeClasses}`}
      data-testid="filter-input"
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default FilterInput;
