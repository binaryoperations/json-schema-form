import type { FC } from 'react';

export const Form: FC<JSX.IntrinsicElements['form']> = function Form(props) {
  return <form {...props} />;
};
