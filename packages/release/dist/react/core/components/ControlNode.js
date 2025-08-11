import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import invariant from '../../../core/internals/invariant';
import { useCallback } from 'react';
import { ControlContext } from '../context/ControlContext';
import { useControl, useControlProps, useControlValue } from '../hooks';
import { useMaybeDevValue } from '../hooks/useMaybeDevValue';
import { useControlNode } from '../hooks/useRenderer';
import { WithErrorBoundary } from './ErrorBoundary';
const Unhandled = () => {
    const [path] = useControl((control) => control.path);
    const [value] = useControlValue(path);
    return useMaybeDevValue(() => (_jsxs("div", { style: { backgroundColor: '#e5e5e5', wordBreak: 'break-all' }, children: ["value: ", JSON.stringify(value), " ", _jsx("br", {}), "scope: ", JSON.stringify(path), " ", _jsx("br", {})] })), () => null);
};
const WithControlContext = (Component) => {
    return function WithControlContext(props) {
        return (_jsx(ControlContext.Provider, { value: props.id, children: _jsx(Component, { ...props }) }));
    };
};
export const ControlNode = WithControlContext(WithErrorBoundary(function ControlNode(props) {
    const [control] = useControl((control) => control);
    const { Control, getValueFromEvent } = invariant(useControlNode(props.id), `Cannot find a relevant control for id: ${props.id}`);
    const path = control.path;
    const { value, setValue, meta, onBlur, onFocus, id: _id, ...rest } = useControlProps(path, {
        ...props,
        ...control.options,
    });
    const handleSetValue = useCallback((e) => {
        setValue(getValueFromEvent(e));
    }, [getValueFromEvent, setValue]);
    return (_jsx(Control, { ...rest, ...meta, value: (value ?? ''), onChange: handleSetValue, onBlur: onBlur, onFocus: onFocus }));
}, Unhandled));
