import { useMemo } from "react";
import useRef from "./useRef";
import { shallowCompare } from "@binaryoperations/json-forms-core/internals/object";

export const useMemoizedValue = <T>(value: T, compareValue = shallowCompare) => {
  const refValue = useRef<T>(value);
  return useMemo(() => {
    if (!compareValue(refValue.current, value)) {
      refValue.current = value;
    }

    return refValue.current as T;
  }, [value]);
}
