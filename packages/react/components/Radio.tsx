import { cast } from '@binaryoperations/json-forms-internals/cast';
import { SyntheticEvent, ChangeEvent } from 'react';
import { Input } from './Input';
import { createBooleanControl } from '@binaryoperations/json-forms-core/controls/createControl';

export const Radio = createBooleanControl(
  (props: JSX.IntrinsicElements['input'] & { type?: 'radio' }) => {
    return <Input.Control {...props} type='radio' />;
  },
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
);
