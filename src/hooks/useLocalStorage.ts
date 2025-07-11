import { useState, useEffect } from 'react';
import type { Task } from '../types/types';

export const useLocalStorage = (key: string, initialValue: Task[]) => {
  const [value, setValue] = useState<Task[]>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};