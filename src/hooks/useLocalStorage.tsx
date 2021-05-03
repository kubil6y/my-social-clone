//----------NEXTJS useLocalStorage----------//
//source: https://codesandbox.io/s/z20gn?file=/pages/index.js:27-447

import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    }
  }, [key]);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
