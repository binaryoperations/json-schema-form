import { ControlNode, FieldsetNode, UiSchema } from '../../models/UiSchema';
export declare class UiStore {
    keyMap: Record<string, UiSchema | FieldsetNode>;
    tree: Record<string, string[]>;
    constructor();
    getChildren(key: string): string[];
    getNode(key: string): FieldsetNode | (import("../../models/UiSchema").FieldsetsNode | import("../../models/UiSchema").RowsNode | import("../../models/UiSchema").ColumnsNode | ControlNode<object>);
    getChildNodes(key: string): (FieldsetNode | (import("../../models/UiSchema").FieldsetsNode | import("../../models/UiSchema").RowsNode | import("../../models/UiSchema").ColumnsNode | ControlNode<object>))[];
    getNodeType(key: string): "fieldsets" | "fieldset" | "rows" | "columns" | "control";
    isControl(key: string): boolean;
    setRoot(key: string): void;
    deriveNodeSchema(key: string): import("../../models").ControlSchema | null;
}
//# sourceMappingURL=UiStore.d.ts.map