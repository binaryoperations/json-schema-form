import { Input } from './Input';
import {
  createDateControl,
  createTimeControl,
} from '@binaryoperations/json-forms-core/controls/createControl';

export const Date = createDateControl(
  (props: JSX.IntrinsicElements['input'] & { type?: 'date' }) => {
    return <Input.Control {...props} type='date' />;
  }
);

export const DateTime = createDateControl(
  (props: JSX.IntrinsicElements['input'] & { type?: 'datetime-local' }) => {
    return <Input.Control {...props} type='datetime-local' />;
  }
);

export const Time = createTimeControl(
  (props: JSX.IntrinsicElements['input'] & { type?: 'time' }) => {
    return <Input.Control {...props} type='time' />;
  }
);
