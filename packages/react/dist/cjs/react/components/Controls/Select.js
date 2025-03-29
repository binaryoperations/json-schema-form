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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy9Db250cm9scy9TZWxlY3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQWtCLEtBQUssRUFBRSxNQUFNLE9BQU8sQ0FBQztBQW9COUMsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLFNBQVMsSUFBSSxDQUFDLEtBQWtCO0lBQ3BELE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxXQUFXLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDeEMsTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUFFLENBQUM7SUFDekIsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUM7SUFFaEMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUMvQyxLQUFDLHFCQUFxQixPQUFhLE1BQU0sSUFBYixDQUFDLENBQWdCLENBQzlDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FDTCw4QkFDRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBTyxPQUFPLEVBQUUsRUFBRSxZQUFHLEtBQUssR0FBUyxFQUNwRCxvQkFBWSxXQUFXLFlBQUcsT0FBTyxHQUFVLElBQzFDLENBQ0osQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxLQUFxQyxFQUFFLEVBQUU7SUFDdEUsSUFBSSxTQUFTLElBQUksS0FBSztRQUFFLE9BQU8sS0FBQyxRQUFRLE9BQUssS0FBSyxHQUFJLENBQUM7SUFDdkQsT0FBTyxLQUFDLE1BQU0sT0FBSyxLQUFLLEdBQUksQ0FBQztBQUMvQixDQUFDLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQXVCLEVBQUUsRUFBRTtJQUMzQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FDNUMsS0FBQyxNQUFNLE9BQXFCLE1BQU0sSUFBckIsTUFBTSxDQUFDLEVBQUUsQ0FBZ0IsQ0FDdkMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxzQkFBYyxLQUFLLFlBQUcsT0FBTyxHQUFZLENBQUM7QUFDbkQsQ0FBQyxDQUFDO0FBRUYsTUFBTSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sRUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUNwRCxvQkFBWSxNQUFNLFlBQUcsS0FBSyxHQUFVLENBQ3JDLENBQUMifQ==