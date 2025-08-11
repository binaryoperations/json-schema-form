import { useEffect, useRef } from "react";
export function useLatest<T>(value: T) {
  const ref = useRef<null | T>(value);
  ref.current = value;

  // Store current value in ref
  useEffect(() => {
    return () => {
      setTimeout(() => (ref.current = null));
    };
  }, []);

  return ref;
}
