import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, memo, useId, } from 'react';
export function withLabel(Component) {
    return memo(forwardRef((props, ref) => {
        const inputId = useId();
        const id = props.id ?? inputId;
        const { label, ...inputProps } = props;
        return (_jsxs(_Fragment, { children: [!label ? null : _jsx("label", { htmlFor: id, children: label }), _jsx(Component, { ...inputProps, ref: ref, id: id })] }));
    }));
}
//# sourceMappingURL=withLabel.js.map