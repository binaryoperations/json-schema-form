
import { type ComponentProps } from 'react';
import { useFormProps, useSubFormProps } from '../../core/hooks/useFormProps';
import { SubFormContext } from '@binaryoperations/json-forms-react/core/context/SubFormContext';

export const Form = function Form(props: ComponentProps<'form'>) {
  return <form {...useFormProps(props)}/>;
};


export const SubForm = function SubForm(props: Pick<ComponentProps<'form'>, 'children' | 'id'>) {
  return <SubFormContext value={useSubFormProps(props)}>{props.children}</SubFormContext>;
}
