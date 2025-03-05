import { createTextControl } from '@binaryoperations/json-forms-core/controls/createControl';
import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import {
  type ChangeEvent,
  forwardRef,
  type SyntheticEvent,
  useId,
} from 'react';
import type { Merge } from 'type-fest';

import { Input, type InputProps } from './Input';

type InputBaseProps = {
  label?: string;
  multiline?: true;
};

export type SingleLineTextInputProps = Merge<
  InputProps,
  Merge<InputBaseProps, { multiline?: false }>
>;

export type TextAreaProps = Merge<
  React.JSX.IntrinsicElements['textarea'],
  Merge<InputBaseProps, { multiline: true }>
>;

export type TextInputProps = InputBaseProps &
  (TextAreaProps | SingleLineTextInputProps);

/**
 *
 *
 * Display Text Area
 *
 */
const TextAreaInput = function Input(props: TextAreaProps) {
  const { label, multiline: _, ...inputProps } = props;

  return (
    <>
      {!label ? null : <label htmlFor={props.id}>{label}</label>}
      <textarea {...inputProps} />
    </>
  );
};

export const TextInput = forwardRef<
  HTMLTextAreaElement | HTMLInputElement,
  TextInputProps
>(function TextInput(props, ref) {
  const inputId = useId();
  const id = props.id ?? inputId;

  if (props.multiline) {
    return <TextAreaInput {...props} id={id} />;
  }

  const { multiline: _, ...textInputProps } = props;
  return <Input {...textInputProps} type="text" id={id} ref={ref} />;
});

export const TextInputControl = createTextControl(
  TextInput,
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
);
