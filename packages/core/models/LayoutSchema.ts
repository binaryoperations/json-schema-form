import type { ControlSchema } from './ControlSchema';

export type Breakpoints<T = any> = Partial<{
  xs: T;
  sm: T;
  md: T;
  lg: T;
  xl: T;
}>;

export enum UiNodeType {
  FIELD_SETS = 'fieldsets',
  FIELD_SET = 'fieldset',
  ROWS = 'rows',
  COLUMNS = 'columns',
  CONTROL = 'control',
  CUSTOM = 'custom',
}

/**
 *
 * Rules
 */
export enum RuleEffect {
  HIDE = 'hide',
  SHOW = 'show',
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

export enum RuleOperator {
  OR = 'or',
  AND = 'and',
}

export type Condition = object;

type RuleSet = {
  operator: RuleOperator;
  conditions: Condition[];
};

type Rules = RuleSet & {
  effect: `${RuleEffect}`;
};

/**
 *
 * Children
 */
type ChildNode<T> = T & {
  order?: number;
};

/**
 *
 * Available Ui Schemas
 *
 */
export interface UiNodeBase<T = object> {
  type: `${UiNodeType}`;
  rules?: Rules;
  id?: string;
  order?: number;
  breakpoints?: Breakpoints<Partial<T>>;
}

export interface FieldsetsNode<
  P extends object = object,
  CP extends object = object,
> extends UiNodeBase<P> {
  type: `${UiNodeType.FIELD_SETS}`;
  nodes: ChildNode<FieldsetNode<CP>>[];
}

export interface FieldsetNode<
  P extends object = object,
  CP extends object = object,
> extends UiNodeBase<P> {
  type: `${UiNodeType.FIELD_SET}`;
  label?: string;
  nodes: ChildNode<PossibleRootNodes<CP>>[];
}

export interface RowsNode<P extends object = object, CP extends object = object>
  extends UiNodeBase<P> {
  type: `${UiNodeType.ROWS}`;
  nodes: ChildNode<PossibleRootNodes<CP>>[];
}

export interface ColumnsNode<
  P extends object = object,
  CP extends object = object,
> extends UiNodeBase<P> {
  type: `${UiNodeType.COLUMNS}`;
  nodes: ChildNode<PossibleRootNodes<CP>>[];
}

export interface ControlNode<T extends object = object> extends UiNodeBase<T> {
  type: `${UiNodeType.CONTROL}`;
  schema?: ControlSchema;
  label?: string;
  path: string;
  options?: T;
}

export interface CustomNode<T = object> extends UiNodeBase<T> {
  type: `${UiNodeType.CUSTOM}`;
  renderer: T | string;
  options?: T;
  nodes?: PossibleRootNodes | ChildNode<PossibleRootNodes>[];
}

type PossibleRootNodes<T extends object = object> =
  | FieldsetsNode<T>
  | RowsNode<T>
  | ColumnsNode<T>
  | ControlNode<T>
  | CustomNode<T>;

export type LayoutSchema<T extends {} = {}> = PossibleRootNodes<T>;
