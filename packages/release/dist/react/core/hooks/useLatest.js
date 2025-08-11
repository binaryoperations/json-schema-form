import { useEffect, useRef } from "react";
export function useLatest(value) {
    const ref = useRef(value);
    ref.current = value;
    // Store current value in ref
    useEffect(() => {
        return () => {
            setTimeout(() => (ref.current = null));
        };
    }, []);
    return ref;
}
