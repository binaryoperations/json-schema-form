import { type Context, useContext } from 'react';

export function useInvariantContext<T>(
  Context: Context<T | null>,
  message: string
) {
  const value = useContext(Context);
  if (value === null) throw new Error(message);

  return value;
}
