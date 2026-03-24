import { useState } from 'react';

/**
 * A hook that works like useState but persists the value in localStorage.
 * The value survives page refreshes.
 *
 * Usage: const [cart, setCart] = useLocalStorage('cart', []);
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // Allow value to be a function (same API as useState)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('useLocalStorage: failed to set value', error);
    }
  };

  return [storedValue, setValue];
}
