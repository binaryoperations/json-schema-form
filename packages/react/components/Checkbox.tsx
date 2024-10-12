import { createBooleanControl } from '@binaryoperations/json-forms-core/controls/createControl';
import { cast } from '@binaryoperations/json-forms-internals/cast';
import type { ChangeEvent, SyntheticEvent } from 'react';

import { Input } from './Input';

export const Checkbox = createBooleanControl(
  function Checkbox(
    props: JSX.IntrinsicElements['input'] & { type?: 'checkbox' }
  ) {
    return <Input.Control {...props} type="checkbox" />;
  },
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.checked
);
