import { useMemo } from "react";
import useRef from "./useRef";
import { shallowCompare } from "../../../core/internals/object";
export const useMemoizedValue = (value, compareValue = shallowCompare) => {
    const refValue = useRef(value);
    return useMemo(() => {
        if (!compareValue(refValue.current, value)) {
            refValue.current = value;
        }
        return refValue.current;
    }, [value]);
};
