import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { withLabel } from './withLabel';
export const Input = withLabel(forwardRef(function Input(props, ref) {
    return _jsx("input", { ...props, ref: ref });
}));
//# sourceMappingURL=Input.js.map