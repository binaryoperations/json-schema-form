import { jsx as _jsx } from "react/jsx-runtime";
import { useFormProps, useSubFormProps } from '../../core/hooks/useFormProps';
export const Form = function Form(props) {
    return _jsx("form", { ...useFormProps(props) });
};
export const SubForm = function SubForm(props) {
    return _jsx("form", { ...useSubFormProps(props) });
};
