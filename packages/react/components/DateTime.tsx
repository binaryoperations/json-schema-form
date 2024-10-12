import { SyntheticEvent } from 'react';
import { Input } from './Input';
import {
  createDateControl,
  createTimeControl,
} from '@binaryoperations/json-forms-core/controls/createControl';
import { ChangeEvent } from 'react';
import { cast } from '@binaryoperations/json-forms-internals/cast';

export const Date = createDateControl(
  (props: JSX.IntrinsicElements['input'] & { type?: 'date' }) => {
    return <Input.Control {...props} type='date' />;
  },
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
);

export const DateTime = createDateControl(
  (props: JSX.IntrinsicElements['input'] & { type?: 'datetime-local' }) => {
    return <Input.Control {...props} type='datetime-local' />;
  },
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
);

export const Time = createTimeControl(
  (props: JSX.IntrinsicElements['input'] & { type?: 'time' }) => {
    return <Input.Control {...props} type='time' />;
  },
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
);
