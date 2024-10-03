export enum UiNodeType {
    FIELD_SETS = "fieldsets",
    FIELD_SET = "fieldset",
    ROWS = "rows",
    COLUMNS = "columns",
    CONTROL = "control",
};

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
    operator: RuleOperator,
    conditions: Condition[],
}


type Rules = RuleSet & {
    effect: RuleEffect,
}

type ChildNode<T> = T & {
    order?: number
}

export interface UiNodeVase {
    type: UiNodeType[keyof UiNodeType];
    rules?: Rules;
    id?: string;
}


export interface FieldsetsNode extends UiNodeVase {
    type: UiNodeType.FIELD_SETS,
    nodes: ChildNode<FieldsetNode>[],
}

export interface FieldsetNode extends UiNodeVase {
    type: UiNodeType.FIELD_SET,
    label?: string,
    nodes: ChildNode<PossibleRootNodes>[]
}

export interface RowsNode extends UiNodeVase {
    type: UiNodeType.ROWS,
    nodes: ChildNode<PossibleRootNodes>[]
}

export interface ColumnsNode extends UiNodeVase {
    type: UiNodeType.COLUMNS,
    nodes: ChildNode<PossibleRootNodes>[]
}

export interface ControlNode extends UiNodeVase {
    type: UiNodeType.CONTROL,
    label?: string;
    property: string;
    readonly?: boolean;
}

type PossibleRootNodes = FieldsetsNode | RowsNode | ColumnsNode | ControlNode;

export type UiSchema = PossibleRootNodes;