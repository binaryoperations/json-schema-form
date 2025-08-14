
import { type ComponentProps } from 'react';
import { useFormProps, useSubFormProps } from '../../core/hooks/useFormProps';

export const Form = function Form(props: ComponentProps<'form'>) {
  return <form {...useFormProps(props)}/>;
};


export const SubForm = function SubForm(props: Pick<ComponentProps<'form'>, 'children' | 'id'>) {
  return <form {...useSubFormProps(props)}>{props.children}</form>;
}
