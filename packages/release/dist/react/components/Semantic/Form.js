import { jsx as _jsx } from "react/jsx-runtime";
import { useFormProps, useSubFormProps } from '../../core/hooks/useFormProps';
import { SubFormContext } from '../../core/context/SubFormContext';
export const Form = function Form(props) {
    return _jsx("form", { ...useFormProps(props) });
};
export const SubForm = function SubForm(props) {
    return _jsx(SubFormContext, { value: useSubFormProps(props), children: props.children });
};
