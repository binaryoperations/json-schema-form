import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { createControl } from './createControl';
import { Input } from './Input';
export const Number = forwardRef(function Number(props, ref) {
    return _jsx(Input, { ...props, type: "number", ref: ref });
});
export const NumberControl = createControl.NumberControl(Number, (event) => {
    const value = event.currentTarget.value;
    return value === '' || isNaN(+value) ? '' : +value;
});
//# sourceMappingURL=Number.js.map