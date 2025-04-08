import { jsx as _jsx } from "react/jsx-runtime";
import { createControl } from '../../core/hoc/createControl';
import { withLabel } from './withLabel';
const Checkbox = withLabel(function Checkbox(props) {
    return _jsx("input", { ...props });
});
export const CheckboxControl = createControl.BooleanControl(Checkbox, (event) => event.nativeEvent.target.checked);
