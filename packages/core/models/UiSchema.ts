import { ControlSchema } from './ControlSchema';

export enum UiNodeType {
  FIELD_SETS = 'fieldsets',
  FIELD_SET = 'fieldset',
  ROWS = 'rows',
  COLUMNS = 'columns',
  CONTROL = 'control',
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
}

export interface FieldsetsNode extends UiNodeBase {
  type: UiNodeType.FIELD_SETS;
  nodes: ChildNode<FieldsetNode>[];
}

export interface FieldsetNode extends UiNodeBase {
  type: UiNodeType.FIELD_SET;
  label?: string;
  nodes: ChildNode<PossibleRootNodes>[];
}

export interface RowsNode extends UiNodeBase {
  type: UiNodeType.ROWS;
  nodes: ChildNode<PossibleRootNodes>[];
}

export interface ColumnsNode extends UiNodeBase {
  type: UiNodeType.COLUMNS;
  nodes: ChildNode<PossibleRootNodes>[];
}

export interface ControlNode<T extends object = object> extends UiNodeBase {
  type: UiNodeType.CONTROL;
  label?: string;
  path: string;
  options?: T;
  schema?: ControlSchema;
}

type PossibleRootNodes = FieldsetsNode | RowsNode | ColumnsNode | ControlNode;

export type UiSchema = PossibleRootNodes;
