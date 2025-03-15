import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import invariant from '../../../core/internals/invariant';
import { useCallback } from 'react';
import { ControlContext } from '../context/ControlContext';
import { useControl, useControlValue } from '../hooks';
import { useMaybeDevValue } from '../hooks/useMaybeDevValue';
import { useControlNode } from '../hooks/useRenderer';
import { withErrorBoundary } from './ErrorBoundary';
const Unhandled = () => {
    const [control] = useControl((control) => control);
    const [value] = useControlValue(control.path);
    return useMaybeDevValue(() => (_jsxs("div", { style: { backgroundColor: '#e5e5e5', wordBreak: 'break-all' }, children: ["value: ", JSON.stringify(value), " ", _jsx("br", {}), "scope: ", JSON.stringify(control.path), " ", _jsx("br", {})] })), () => null);
};
const withControlContext = (Component) => {
    return function withControlContext(props) {
        return (_jsx(ControlContext.Provider, { value: props.id, children: _jsx(Component, { ...props }) }));
    };
};
export const ControlNode = withControlContext(withErrorBoundary(function ControlNode(props) {
    const [control] = useControl((control) => control);
    const { Control, getValueFromEvent } = invariant(useControlNode(props.id), `Cannot find a relevant control for id: ${props.id}`);
    const path = control.path;
    const [value, setValue] = useControlValue(path);
    const handleSetValue = useCallback((e) => {
        setValue(getValueFromEvent(e));
    }, [getValueFromEvent, setValue]);
    return (_jsx(Control, { ...control.options, label: path, value: (value ?? ''), onChange: handleSetValue }));
}, Unhandled));
//# sourceMappingURL=ControlNode.js.map