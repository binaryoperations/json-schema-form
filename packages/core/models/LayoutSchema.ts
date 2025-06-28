import type { ControlSchema } from './ControlSchema';

import type { SetOptional } from "type-fest";

export type Breakpoints<T = any> = Partial<{
  xs: T;
  sm: T;
  md: T;
  lg: T;
  xl: T;
}>;

export enum EnumUiNode {
  CONTROL = 'control',
  LAYOUT = 'layout',
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
export interface UiNodeBase<
  P extends object = object,
  CP = object,
> {
  type: string;
  rules?: Rules;
  id?: string;
  order?: number;
  breakpoints?: Breakpoints<Partial<P>>;
  nodes?: ChildNode<PossibleRootNodes<CP, P>>[];
  renderer: CP | string;
}

export interface LayoutNodeType<
  CP = object,
  P extends object = object,
> extends UiNodeBase<P, CP> {
  type: `${EnumUiNode.LAYOUT}`;
  options?: P;
}

export interface ControlNodeType<T extends object = object> extends SetOptional<UiNodeBase<T>, 'renderer'> {
  type: `${EnumUiNode.CONTROL}`;
  schema?: ControlSchema;
  label?: string;
  path: string;
  options?: T;
}


type PossibleRootNodes<CP = object,T extends object = object>=
  | LayoutNodeType<CP, T>
  | ControlNodeType<T>;

export type LayoutSchema<T extends {} = {}> = PossibleRootNodes<T>;
