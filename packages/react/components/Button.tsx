import type { FC } from 'react';

export type ButtonProps = React.JSX.IntrinsicElements['button'];

export type Button = FC<ButtonProps>;

export const Button: Button = (props) => {
  return <button {...props} />;
};
