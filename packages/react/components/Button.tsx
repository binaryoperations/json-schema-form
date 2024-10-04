import type { FC } from 'react';

export const Button: FC<JSX.IntrinsicElements['button']> = (props) => {
  return <button {...props} />;
};
