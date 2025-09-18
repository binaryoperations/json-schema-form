import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import invariant from '../../../core/internals/invariant';
import { use } from 'react';
import { useCallback } from 'react';
import { ControlContext } from '../context/ControlContext';
import { useControl, useControlProps } from '../hooks';
import { useMaybeDevValue } from '../hooks/useMaybeDevValue';
import { useControlNode } from '../hooks/useRenderer';
import { WithErrorBoundary } from './ErrorBoundary';
import { fastDeepEqual } from '../../../core/internals/object';
const Unhandled = (props) => {
    const controlId = use(ControlContext);
    return useMaybeDevValue(() => (_jsxs("div", { style: { backgroundColor: '#e5e5e5', wordBreak: 'break-all' }, children: [controlId, ": ", props.error?.message] })), () => null);
};
const WithControlContext = (Component) => {
    return function WithControlContext(props) {
        return (_jsx(ControlContext.Provider, { value: props.id, children: _jsx(Component, { ...props }) }));
    };
};
export const ControlNode = WithControlContext(WithErrorBoundary(function ControlNode(props) {
    const [path] = useControl((control) => control.path);
    const [options] = useControl((control) => control.options, fastDeepEqual);
    const { Control, getValueFromEvent } = invariant(useControlNode(props.id), `Cannot find a relevant control for id: ${props.id}`);
    const { value, setValue, meta, onBlur, onFocus, id: _id, ...rest } = useControlProps(path, {
        ...props,
        ...options,
    });
    const handleSetValue = useCallback((e) => {
        setValue(getValueFromEvent(e));
    }, [getValueFromEvent, setValue]);
    return (_jsx(Control, { ...rest, ...meta, value: (value ?? ''), onChange: handleSetValue, onBlur: onBlur, onFocus: onFocus }));
}, Unhandled));
