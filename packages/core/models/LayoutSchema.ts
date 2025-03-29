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
export interface UiNodeBase {
  type: `${UiNodeType}`;
  rules?: Rules;
  id?: string;
  breakpoints?: Breakpoints;
}

export interface FieldsetsNode extends UiNodeBase {
  type: `${UiNodeType.FIELD_SETS}`;
  nodes: ChildNode<FieldsetNode>[];
}

export interface FieldsetNode extends UiNodeBase {
  type: `${UiNodeType.FIELD_SET}`;
  label?: string;
  nodes: ChildNode<PossibleRootNodes>[];
}

export interface RowsNode extends UiNodeBase {
  type: `${UiNodeType.ROWS}`;
  nodes: ChildNode<PossibleRootNodes>[];
}

export interface ColumnsNode extends UiNodeBase {
  type: `${UiNodeType.COLUMNS}`;
  nodes: ChildNode<PossibleRootNodes>[];
}

export interface ControlNode<T extends object = object> extends UiNodeBase {
  type: `${UiNodeType.CONTROL}`;
  schema?: ControlSchema;
  label?: string;
  path: string;
  options?: T;
}

export interface CustomNode<T = any> extends UiNodeBase {
  type: `${UiNodeType.CUSTOM}`;
  renderer: T | string;
  options?: T;
  nodes?: PossibleRootNodes | ChildNode<PossibleRootNodes>[];
}

type PossibleRootNodes =
  | FieldsetsNode
  | RowsNode
  | ColumnsNode
  | ControlNode
  | CustomNode;

export type LayoutSchema<T extends {} = {}> = PossibleRootNodes & T;
