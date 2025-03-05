import { createBooleanControl } from '@binaryoperations/json-forms-core/controls/createControl';
import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import type { ChangeEvent, SyntheticEvent } from 'react';

import { withLabel } from './withLabel';

type CheckboxAttributes = React.JSX.IntrinsicElements['input'];

export interface CheckboxProps extends CheckboxAttributes {
  type?: 'checkbox';
}

const Checkbox = withLabel<CheckboxProps>(function Checkbox(props) {
  return <input {...props} />;
});

export const CheckboxControl = createBooleanControl(
  Checkbox,
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.checked
);
