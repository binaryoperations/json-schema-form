import { cast } from '@binaryoperations/json-forms-internals/cast';
import { SyntheticEvent, ChangeEvent } from 'react';
import { Input } from './Input';
import { createNumberControl } from '@binaryoperations/json-forms-core/controls/createControl';

export const Number = createNumberControl(
  function Number(props: JSX.IntrinsicElements['input'] & { type?: 'number' }) {
    return <Input.Control {...props} type='number' />;
  },
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
);
