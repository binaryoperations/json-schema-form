import { useEffect, useRef as useReactRef } from 'react';
export const useRef = (value) => {
    const ref = useReactRef(value);
    // clear the value after the timeout.
    useEffect(() => () => (setTimeout(() => (ref.current = null)), undefined), [ref]);
    return ref;
};
export default useRef;
