import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Input } from './Input';
export const Date = forwardRef(function Date(props, ref) {
    return _jsx(Input, { ...props, type: "date", ref: ref });
});
export const DateTime = forwardRef(function DateTime(props, ref) {
    return _jsx(Input, { ...props, type: "datetime-local", ref: ref });
});
export const Time = forwardRef(function Time(props, ref) {
    return _jsx(Input, { ...props, type: "time", ref: ref });
});
