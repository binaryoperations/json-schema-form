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
    deriveSchemaAtPointer(key: string, data?: object): (import("@binaryoperations/json-forms-core/models/ControlSchema").CompositeSchema | import("@binaryoperations/json-forms-core/models/ControlSchema").StringJsonSchema | import("@binaryoperations/json-forms-core/models/ControlSchema").NumberJsonSchema | import("@binaryoperations/json-forms-core/models/ControlSchema").ArrayJsonSchema | import("@binaryoperations/json-forms-core/models/ControlSchema").ObjectJsonSchema | import("@binaryoperations/json-forms-core/models/ControlSchema").NullJsonSchema | import("@binaryoperations/json-forms-core/models/ControlSchema").BooleanJsonSchema | import("@binaryoperations/json-forms-core/models/ControlSchema").OneOfRootSchema | import("@binaryoperations/json-forms-core/models/ControlSchema").AnyOfRootSchema) | null;
    deriveSchemaNodeAtPointer(key: string, data?: object): SchemaNode;
}
//# sourceMappingURL=UiStore.d.ts.map