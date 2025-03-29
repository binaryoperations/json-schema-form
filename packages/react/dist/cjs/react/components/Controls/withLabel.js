import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, memo, useId } from 'react';
export function withLabel(Component) {
    return memo(forwardRef((props, ref) => {
        const inputId = useId();
        const id = props.id ?? inputId;
        const { label, error, ...inputProps } = props;
        return (_jsxs(_Fragment, { children: [!error && !label ? null : (_jsx("label", { htmlFor: id, children: error || label })), _jsx(Component, { ...inputProps, ref: ref, id: id })] }));
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aExhYmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy9Db250cm9scy93aXRoTGFiZWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQWlCLFVBQVUsRUFBRSxJQUFJLEVBQWtCLEtBQUssRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUUvRSxNQUFNLFVBQVUsU0FBUyxDQUd2QixTQUEwQztJQUMxQyxPQUFPLElBQUksQ0FDVCxVQUFVLENBQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDOUIsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLENBQUM7UUFDeEIsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUM7UUFFL0IsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDOUMsT0FBTyxDQUNMLDhCQUNHLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ3pCLGdCQUFPLE9BQU8sRUFBRSxFQUFFLFlBQUcsS0FBSyxJQUFJLEtBQUssR0FBUyxDQUM3QyxFQUNELEtBQUMsU0FBUyxPQUFNLFVBQStCLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFJLElBQ3BFLENBQ0osQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7QUFDSixDQUFDIn0=