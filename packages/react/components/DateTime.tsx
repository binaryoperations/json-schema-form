import {
  createDateControl,
  createTimeControl,
} from '@binaryoperations/json-forms-core/controls/createControl';
import { cast } from '@binaryoperations/json-forms-internals/cast';
import type { ChangeEvent, SyntheticEvent } from 'react';

import { Input } from './Input';

export const Date = createDateControl(
  function Date(props: JSX.IntrinsicElements['input'] & { type?: 'date' }) {
    return <Input.Control {...props} type="date" />;
  },
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
);

export const DateTime = createDateControl(
  function DateTime(
    props: JSX.IntrinsicElements['input'] & { type?: 'datetime-local' }
  ) {
    return <Input.Control {...props} type="datetime-local" />;
  },
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
);

export const Time = createTimeControl(
  function Time(props: JSX.IntrinsicElements['input'] & { type?: 'time' }) {
    return <Input.Control {...props} type="time" />;
  },
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
);
