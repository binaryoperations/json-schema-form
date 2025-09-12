import invariant from '@binaryoperations/json-forms-core/internals/invariant';
import { type Context, use } from 'react';

export function useInvariantContext<T>(
  Context: Context<T | null>,
  message: string
) {
  return invariant(use(Context),message);
}
