import invariant from '@binaryoperations/json-forms-internals/invariant';
import { type Context, useContext } from 'react';

export function useInvariantContext<T>(
  Context: Context<T | null>,
  message: string
) {
  const value = invariant(useContext(Context), message);
  return value;
}
