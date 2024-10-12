import { ID } from '../../type';

export type ActiveStateType<T = ID> = {
  activeState: T[];
  multiple?: boolean;
};
