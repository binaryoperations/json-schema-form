import { ControlNode, FieldsetNode, UiSchema } from '../../models/UiSchemaType';
export declare class UiStore {
    keyMap: Record<string, UiSchema | FieldsetNode>;
    tree: Record<string, string[]>;
    constructor();
    getChildren(key: string): string[];
    getNode(key: string): FieldsetNode | (import("../../models/UiSchemaType").FieldsetsNode | import("../../models/UiSchemaType").RowsNode | import("../../models/UiSchemaType").ColumnsNode | ControlNode<object> | import("../../models/UiSchemaType").CustomNode<any>);
    getChildNodes(key: string): (FieldsetNode | (import("../../models/UiSchemaType").FieldsetsNode | import("../../models/UiSchemaType").RowsNode | import("../../models/UiSchemaType").ColumnsNode | ControlNode<object> | import("../../models/UiSchemaType").CustomNode<any>))[];
    getNodeType(key: string): "fieldsets" | "fieldset" | "rows" | "columns" | "control" | "custom";
    isControl(key: string): boolean;
    setRoot(key: string): void;
    deriveNodeSchema(key: string): import("../../models").ControlSchema | null;
}
//# sourceMappingURL=UiStore.d.ts.map
