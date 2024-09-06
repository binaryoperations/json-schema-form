import { useEffect, useRef as useReactRef } from 'react';

export const useRef = <T>(value: T) => {
    const ref = useReactRef<T | null>(value);

    // clear the value after the timeout.
    useEffect(() => () => (setTimeout(() => {
        ref.current = null;
    }), undefined), []);

    return ref;    
}

export default useRef;