import { type ReactNode, useId } from 'react';

export type OptionProps = {
  label: ReactNode;
  id: string;
};

export type OptionGroupProps = {
  label: string;
  options: OptionProps[];
};

export type SelectProps = Omit<React.JSX.IntrinsicElements['select'], 'children'> & {
  options: (OptionProps | OptionGroupProps)[];
  label: string;
};

export const Select = function Form(props: SelectProps) {
  const { label, ...selectProps } = props;
  const selectId = useId();
  const id = props.id || selectId;

  const options = props.options.map((option, i) => (
    <RenderVariaidicOption key={i} {...option} />
  ));

  return (
    <>
      {!label ? null : <label htmlFor={id}>{label}</label>}
      <select {...selectProps}>{options}</select>
    </>
  );
};

const RenderVariaidicOption = (props: OptionProps | OptionGroupProps) => {
  if ('options' in props) return <OptGroup {...props} />;
  return <Option {...props} />;
};

const OptGroup = (props: OptionGroupProps) => {
  const options = props.options.map((option) => (
    <Option key={option.id} {...option} />
  ));
  return <optgroup {...props}>{options}</optgroup>;
};

const Option = ({ label, ...option }: OptionProps) => (
  <option {...option}>{label}</option>
);
