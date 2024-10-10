import { Input } from './Input';
import { createBooleanControl } from '@binaryoperations/json-forms-core/controls/createControl';

export const Checkbox = createBooleanControl(
  (props: JSX.IntrinsicElements['input'] & { type?: 'checkbox' }) => {
    return <Input.Control {...props} type='checkbox' />;
  }
);
