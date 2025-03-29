import { FieldsetNode, LayoutSchema } from '../../models/LayoutSchema';
import { LogicalSchema, SchemaNode } from '../logical.schema/Parser';
export type { SchemaNode };
export declare class UiStore {
    private draftSchema;
    keyMap: Record<string, LayoutSchema | FieldsetNode>;
    tree: Record<string, string[]>;
    constructor(draftSchema: LogicalSchema);
    getChildren(key: string): string[];
    getNode(key: string): LayoutSchema | FieldsetNode<object, object>;
    getChildNodes(key: string): (LayoutSchema | FieldsetNode<object, object>)[];
    getNodeType(key: string): "fieldsets" | "fieldset" | "rows" | "columns" | "control" | "custom";
    isControl(key: string): boolean;
    setRoot(key: string): void;
    deriveSchemaAtPointer(key: string, data?: object): import("../../models").ControlSchema | null;
    deriveSchemaNodeAtPointer(key: string, data?: object): SchemaNode;
}
//# sourceMappingURL=UiStore.d.ts.map