import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, } from 'react';
import { Input } from './Input';
export const Number = forwardRef(function Number(props, ref) {
    return _jsx(Input, { ...props, type: "number", ref: ref });
});
