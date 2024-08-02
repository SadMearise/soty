import { useEffect, useState } from "react";

const useDebounce = <T>(callback: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(callback);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(callback);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, callback]);

  return debouncedValue;
};

export default useDebounce;
