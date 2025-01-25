import invariant from '@binaryoperations/json-forms-core/internals/invariant';
import { type Context, useContext } from 'react';

export function useInvariantContext<T>(
  Context: Context<T | null>,
  message: string
) {
  const value = useContext(Context);
  return invariant(value, message);
}
