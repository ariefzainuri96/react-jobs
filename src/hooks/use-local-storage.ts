import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T | null,
): [T | null, (value: T | null) => void] {
  const [value, setValue] = useState<T | null>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const updateValue = (newValue: T | null) => setValue(newValue);

  return [value, updateValue];
}
