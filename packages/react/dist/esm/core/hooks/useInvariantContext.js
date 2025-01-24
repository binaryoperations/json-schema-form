import invariant from '@binaryoperations/json-forms-internals/invariant';
import { useContext } from 'react';
export function useInvariantContext(Context, message) {
    const value = useContext(Context);
    return invariant(value, message);
}
//# sourceMappingURL=useInvariantContext.js.map