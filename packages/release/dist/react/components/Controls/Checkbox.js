import { createControl } from "../../core/hoc/createControl";
import { Checkbox } from "../Inputs/Checkbox";
export const CheckboxControl = createControl.BooleanControl(Checkbox, (event) => event.nativeEvent.target.checked);
