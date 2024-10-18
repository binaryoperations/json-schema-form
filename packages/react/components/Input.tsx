import { createTextControl } from '@binaryoperations/json-forms-core/controls/createControl';
import { cast } from '@binaryoperations/json-forms-internals/cast';
import { type ChangeEvent, type SyntheticEvent, useId } from 'react';
import type { Merge } from 'type-fest';

type InputBaseProps = {
  label?: string;
  multiline?: true;
};

type HtmlInputProps = Merge<
  JSX.IntrinsicElements['input'],
  Merge<InputBaseProps, { multiline?: false }>
>;

type HtmlTextAreaProps = Merge<
  JSX.IntrinsicElements['textarea'],
  Merge<InputBaseProps, { multiline: true }>
>;

export type InputProps = InputBaseProps & (HtmlTextAreaProps | HtmlInputProps);

/**
 *
 *
 * Display Single Line input
 *
 */
const SingleLineInput = function Input(props: HtmlInputProps) {
  const { label, ...inputProps } = props;

  return (
    <>
      {!label ? null : <label htmlFor={props.id}>{label}</label>}
      <input {...inputProps} />
    </>
  );
};

/**
 *
 *
 * Display Text Area
 *
 */
const TextAreaInput = function Input(props: HtmlTextAreaProps) {
  const { label, multiline: _, ...inputProps } = props;

  return (
    <>
      {!label ? null : <label htmlFor={props.id}>{label}</label>}
      <textarea {...inputProps} />
    </>
  );
};

export const Input = createTextControl(
  function Input(props: InputProps) {
    const inputId = useId();
    const id = props.id ?? inputId;

    if (props.multiline) {
      return <TextAreaInput {...props} id={id} />;
    }

    const { multiline: _, ...textInputProps } = props;
    return <SingleLineInput {...textInputProps} id={id} />;
  },
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
);
