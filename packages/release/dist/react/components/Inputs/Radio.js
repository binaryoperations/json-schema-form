import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Input } from './Input';
export const Radio = forwardRef(function Radio(props, ref) {
    return _jsx(Input, { ...props, type: "radio", ref: ref });
});
