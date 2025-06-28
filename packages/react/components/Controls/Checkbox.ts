import { createControl } from "@binaryoperations/json-forms-react/core/hoc/createControl";
import { Checkbox } from "../Inputs/Checkbox";
import { ChangeEvent, SyntheticEvent } from "react";

export const CheckboxControl = createControl.BooleanControl(
  Checkbox,
  (event: SyntheticEvent<HTMLInputElement, ChangeEvent<HTMLInputElement>>) =>
    event.nativeEvent.target.checked
);
