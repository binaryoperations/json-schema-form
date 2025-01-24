import { jsx as _jsx } from "react/jsx-runtime";
import { cast } from '@binaryoperations/json-forms-internals/cast';
import { useMemo } from 'react';
import useRef from '../../core/hooks/useRef';
import useSafeCallback from '../../core/hooks/useSafeCallback';
import { ActiveStateProvider } from './ActiveStateContext';
export const usePrepareContextValue = (props) => {
    const defaultValue = useRef(props.defaultValue).current;
    const value = props.value ?? defaultValue;
    return useMemo(() => {
        const activeState = Array.isArray(value)
            ? value
            : !value && isNaN(Number(value ?? NaN))
                ? []
                : [value];
        return { activeState, multiple: props.multiple };
    }, [value, props.multiple]);
};
export default function useActiveStateContext(props) {
    const activeState = usePrepareContextValue(props);
    const onChange = useSafeCallback((nextValue) => {
        if (props.multiple) {
            cast(props).onChange?.(nextValue.activeState);
            return;
        }
        cast(props).onChange?.(nextValue.activeState[0]);
    });
    return {
        onChange,
        render: (children) => (_jsx(ActiveStateProvider, { value: activeState, onChange: props.onChange && onChange, children: children })),
    };
}
//# sourceMappingURL=hooks.js.map