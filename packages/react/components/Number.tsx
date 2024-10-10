import { Input } from './Input';
import { createNumberControl } from '@binaryoperations/json-forms-core/controls/createControl';

export const Number = createNumberControl(
  (props: JSX.IntrinsicElements['input'] & { type?: 'number' }) => {
    return <Input.Control {...props} type='number' />;
  }
);
