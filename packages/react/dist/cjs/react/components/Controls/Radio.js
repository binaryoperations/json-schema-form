import { jsx as _jsx } from "react/jsx-runtime";
import { createBooleanControl } from '../../../core/controls/createControl';
import { cast } from '../../../core/internals/cast';
import { forwardRef } from 'react';
import { Input } from './Input';
const Radio = forwardRef(function Radio(props, ref) {
    return _jsx(Input, { ...props, type: "radio", ref: ref });
});
export const RadioControl = createBooleanControl(Radio, (event) => cast(event).target.value);
//# sourceMappingURL=Radio.js.map