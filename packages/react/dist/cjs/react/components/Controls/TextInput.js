import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId, } from 'react';
import { createControl } from './createControl';
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
export const TextInputControl = createControl.TextControl(TextInput, (event) => event.nativeEvent.target.value);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dElucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy9Db250cm9scy9UZXh0SW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBRUwsVUFBVSxFQUVWLEtBQUssR0FDTixNQUFNLE9BQU8sQ0FBQztBQUdmLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsS0FBSyxFQUFtQixNQUFNLFNBQVMsQ0FBQztBQW9CakQ7Ozs7O0dBS0c7QUFDSCxNQUFNLGFBQWEsR0FBRyxTQUFTLEtBQUssQ0FBQyxLQUFvQjtJQUN2RCxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsR0FBRyxVQUFVLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFFckQsT0FBTyxDQUNMLDhCQUNHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFPLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxZQUFHLEtBQUssR0FBUyxFQUMxRCxzQkFBYyxVQUFVLEdBQUksSUFDM0IsQ0FDSixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FHakMsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUc7SUFDN0IsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLENBQUM7SUFDeEIsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUM7SUFFL0IsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFO1FBQ25CLE9BQU8sS0FBQyxhQUFhLE9BQUssS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUksQ0FBQztLQUM3QztJQUVELE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEdBQUcsY0FBYyxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQ2xELE9BQU8sS0FBQyxLQUFLLE9BQUssY0FBYyxFQUFFLElBQUksRUFBQyxNQUFNLEVBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFJLENBQUM7QUFDckUsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUN2RCxTQUFTLEVBQ1QsQ0FBQyxLQUFzRSxFQUFFLEVBQUUsQ0FDekUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFPLENBQUMsS0FBSyxDQUNsQyxDQUFDIn0=