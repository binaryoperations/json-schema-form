import { jsx as _jsx } from "react/jsx-runtime";
import { createDateControl, createTimeControl, } from '@binaryoperations/json-forms-core/controls/createControl';
import { cast } from '@binaryoperations/json-forms-internals/cast';
import { forwardRef } from 'react';
import { Input } from './Input';
export const Date = forwardRef(function Date(props, ref) {
    return _jsx(Input, { ...props, type: "date", ref: ref });
});
export const DateControl = createDateControl(Date, (event) => cast(event).target.value);
export const DateTime = forwardRef(function DateTime(props, ref) {
    return _jsx(Input, { ...props, type: "datetime-local", ref: ref });
});
export const DateTimeControl = createDateControl(DateTime, (event) => cast(event).target.value);
export const Time = forwardRef(function Time(props, ref) {
    return _jsx(Input, { ...props, type: "time", ref: ref });
});
export const TimeControl = createTimeControl(Time, (event) => cast(event).target.value);
//# sourceMappingURL=DateTime.js.map