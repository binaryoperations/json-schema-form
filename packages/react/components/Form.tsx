import type { FC } from 'react';

export const Form: FC<JSX.IntrinsicElements['form']> = (props) => {
  return <form {...props} />;
};
