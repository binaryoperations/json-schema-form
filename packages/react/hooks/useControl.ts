import { ControlJsonSchema } from '../../core/models';

export const useControl = (control: ControlJsonSchema) => {
  return control.type;
};
