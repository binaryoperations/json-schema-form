import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { createTextControl } from '../../../core/controls/createControl';
import { cast } from '../../../core/internals/cast';
import { forwardRef, useId, } from 'react';
import { Input } from './Input';
/**
 *
 *
 * Display Text Area
 *
 */
const TextAreaInput = function Input(props) {
    const { label, multiline: _, ...inputProps } = props;
    return (_jsxs(_Fragment, { children: [!label ? null : _jsx("label", { htmlFor: props.id, children: label }), _jsx("textarea", { ...inputProps })] }));
};
export const TextInput = forwardRef(function TextInput(props, ref) {
    const inputId = useId();
    const id = props.id ?? inputId;
    if (props.multiline) {
        return _jsx(TextAreaInput, { ...props, id: id });
    }
    const { multiline: _, ...textInputProps } = props;
    return _jsx(Input, { ...textInputProps, type: "text", id: id, ref: ref });
});
export const TextInputControl = createTextControl(TextInput, (event) => cast(event).target.value);
//# sourceMappingURL=TextInput.js.map