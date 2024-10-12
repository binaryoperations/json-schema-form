import { cast } from '@binaryoperations/json-forms-internals/cast';
import { SyntheticEvent, ChangeEvent } from 'react';
import { Input } from './Input';
import { createBooleanControl } from '@binaryoperations/json-forms-core/controls/createControl';

export const Checkbox = createBooleanControl(
  function Checkbox(
    props: JSX.IntrinsicElements['input'] & { type?: 'checkbox' }
  ) {
    return <Input.Control {...props} type='checkbox' />;
  },
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.checked
);
