import { jsx as _jsx } from "react/jsx-runtime";
import { createBooleanControl } from '@binaryoperations/json-forms-core/controls/createControl';
import { cast } from '@binaryoperations/json-forms-internals/cast';
import { withLabel } from './withLabel';
const Checkbox = withLabel(function Checkbox(props) {
    return _jsx("input", { ...props });
});
export const CheckboxControl = createBooleanControl(Checkbox, (event) => cast(event).target.checked);
//# sourceMappingURL=Checkbox.js.map