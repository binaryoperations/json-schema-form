import invariant from '../../../core/internals/invariant';
import { use } from 'react';
export function useInvariantContext(Context, message) {
    return invariant(use(Context), message);
}
