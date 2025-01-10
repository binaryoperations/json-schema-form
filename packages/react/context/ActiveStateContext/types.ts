export type ActiveStateType<T = unknown> = {
  activeState: T[];
  multiple?: boolean;
};

export type ActiveStateContextPropsSingle<T = unknown> = {
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
  multiple?: boolean;
};

export type ActiveStateContextPropsMultiple<T = unknown> = {
  defaultValue?: T | T[];
  value?: T | T[];
  onChange?: (value: T[]) => void;
  multiple: true;
};

export type ActiveStateProps<T = unknown> =
  | ActiveStateContextPropsSingle<T>
  | ActiveStateContextPropsMultiple<T>;
