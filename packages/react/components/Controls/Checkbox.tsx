import type { ChangeEvent, SyntheticEvent } from 'react';

import { createControl } from './createControl';
import { withLabel } from './withLabel';

type CheckboxAttributes = React.JSX.IntrinsicElements['input'];

export interface CheckboxProps extends CheckboxAttributes {
  type?: 'checkbox';
}

const Checkbox = withLabel<CheckboxProps>(function Checkbox(props) {
  return <input {...props} />;
});

export const CheckboxControl = createControl.BooleanControl(
  Checkbox,
  (event: SyntheticEvent<HTMLInputElement, ChangeEvent<HTMLInputElement>>) =>
    event.nativeEvent.target.checked
);
