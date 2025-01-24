import { jsx as _jsx } from "react/jsx-runtime";
import { createNumberControl } from '@binaryoperations/json-forms-core/controls/createControl';
import { cast } from '@binaryoperations/json-forms-internals/cast';
import { forwardRef } from 'react';
import { Input } from './Input';
export const Number = forwardRef(function Number(props, ref) {
    return _jsx(Input, { ...props, type: "number", ref: ref });
});
export const NumberControl = createNumberControl(Number, (event) => cast(event).target.value);
//# sourceMappingURL=Number.js.map