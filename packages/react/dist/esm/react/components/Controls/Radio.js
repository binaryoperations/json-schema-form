import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { createControl } from './createControl';
import { Input } from './Input';
const Radio = forwardRef(function Radio(props, ref) {
    return _jsx(Input, { ...props, type: "radio", ref: ref });
});
export const RadioControl = createControl.BooleanControl(Radio, (event) => event.nativeEvent.target.checked);
//# sourceMappingURL=Radio.js.map