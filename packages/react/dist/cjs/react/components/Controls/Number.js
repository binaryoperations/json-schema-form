import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { createControl } from './createControl';
import { Input } from './Input';
export const Number = forwardRef(function Number(props, ref) {
    return _jsx(Input, { ...props, type: "number", ref: ref });
});
export const NumberControl = createControl.NumberControl(Number, (event) => event.nativeEvent.target.value);
//# sourceMappingURL=Number.js.map