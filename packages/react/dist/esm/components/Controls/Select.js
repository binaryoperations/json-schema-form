import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from 'react';
export const Select = function Form(props) {
    const { label, ...selectProps } = props;
    const selectId = useId();
    const id = props.id || selectId;
    const options = props.options.map((option, i) => (_jsx(RenderVariaidicOption, { ...option }, i)));
    return (_jsxs(_Fragment, { children: [!label ? null : _jsx("label", { htmlFor: id, children: label }), _jsx("select", { ...selectProps, children: options })] }));
};
const RenderVariaidicOption = (props) => {
    if ('options' in props)
        return _jsx(OptGroup, { ...props });
    return _jsx(Option, { ...props });
};
const OptGroup = (props) => {
    const options = props.options.map((option) => (_jsx(Option, { ...option }, option.id)));
    return _jsx("optgroup", { ...props, children: options });
};
const Option = ({ label, ...option }) => (_jsx("option", { ...option, children: label }));
//# sourceMappingURL=Select.js.map