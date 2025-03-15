import type { FC } from 'react';

export const Form: FC<React.JSX.IntrinsicElements['form']> = function Form(
  props
) {
  return <form {...props} />;
};
