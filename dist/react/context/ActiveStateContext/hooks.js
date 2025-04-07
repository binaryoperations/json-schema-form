import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import { createElement, useMemo } from 'react';
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
export function useActiveStateContext(props) {
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
        render: (children) => createElement(ActiveStateProvider, {
            value: activeState,
            onChange: props.onChange && onChange,
        }, children),
    };
}
