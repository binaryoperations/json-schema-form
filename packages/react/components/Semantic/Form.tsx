
import { type ComponentProps } from 'react';
import { useFormProps, useSubFormProps } from '../../core/hooks/useFormProps';

export const Form = function Form(props: ComponentProps<'form'>) {
  return <form {...useFormProps(props)}/>;
};


export const SubForm = function SubForm(props: Omit<ComponentProps<'form'>, 'onSubmit'>) {
  return <form {...useSubFormProps(props)}/>;
}
