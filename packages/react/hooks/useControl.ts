import { ControlSchema } from '../../core/models';

export const useControl = (control: ControlSchema) => {
  return control.type;
};
