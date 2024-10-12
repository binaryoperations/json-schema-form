import { createTextControl } from '@binaryoperations/json-forms-core/controls/createControl';
import { cast } from '@binaryoperations/json-forms-internals/cast';
import { ChangeEvent, SyntheticEvent, useId } from 'react';

type HtmlInputProps = JSX.IntrinsicElements['input'];
export interface InputProps extends HtmlInputProps {
  label?: string;
}

export const Input = createTextControl(
  (props: InputProps) => {
    const inputId = useId();
    const { label: inputLabel, id = inputId, ...inputProps } = props;

    return (
      <>
        {!inputLabel ? null : <label htmlFor={id}>{inputLabel}</label>}
        <input {...inputProps} id={id} />
      </>
    );
  },
  (event: SyntheticEvent) =>
    cast<ChangeEvent<HTMLInputElement>>(event).target.value
);
