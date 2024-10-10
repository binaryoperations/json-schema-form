import { Input } from './Input';
import { createBooleanControl } from '@binaryoperations/json-forms-core/controls/createControl';

export const Radio = createBooleanControl(
  (props: JSX.IntrinsicElements['input'] & { type?: 'radio' }) => {
    return <Input.Control {...props} type='radio' />;
  }
);
