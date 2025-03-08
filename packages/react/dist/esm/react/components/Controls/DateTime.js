import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { createControl } from './createControl';
import { Input } from './Input';
export const Date = forwardRef(function Date(props, ref) {
    return _jsx(Input, { ...props, type: "date", ref: ref });
});
export const DateControl = createControl.DateControl(Date, (event) => event.nativeEvent.target.value);
export const DateTime = forwardRef(function DateTime(props, ref) {
    return _jsx(Input, { ...props, type: "datetime-local", ref: ref });
});
export const DateTimeControl = createControl.DateControl(DateTime, (event) => event.nativeEvent.target.value);
export const Time = forwardRef(function Time(props, ref) {
    return _jsx(Input, { ...props, type: "time", ref: ref });
});
export const TimeControl = createControl.TimeControl(Time, (event) => event.nativeEvent.target.value);
//# sourceMappingURL=DateTime.js.map