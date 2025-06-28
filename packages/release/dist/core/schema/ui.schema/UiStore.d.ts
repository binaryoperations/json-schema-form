import { LayoutSchema } from '../../models/LayoutSchema';
import { LogicalSchema, SchemaNode } from '../logical.schema/Parser';
export type { SchemaNode };
export declare class UiStore {
    private draftSchema;
    keyMap: Record<string, LayoutSchema>;
    tree: Record<string, string[]>;
    constructor(draftSchema: LogicalSchema);
    getChildren(key: string): string[];
    getNode(key: string): LayoutSchema;
    getChildNodes(key: string): LayoutSchema[];
    getNodeType(key: string): string | {};
    isControl(key: string): boolean;
    freeze(): this;
    deriveSchemaAtPointer(key: string, data?: object): (import("../../models/ControlSchema").CompositeSchema | import("../../models/ControlSchema").StringJsonSchema | import("../../models/ControlSchema").NumberJsonSchema | import("../../models/ControlSchema").ArrayJsonSchema | import("../../models/ControlSchema").ObjectJsonSchema | import("../../models/ControlSchema").NullJsonSchema | import("../../models/ControlSchema").BooleanJsonSchema | import("../../models/ControlSchema").OneOfRootSchema | import("../../models/ControlSchema").AnyOfRootSchema) | null;
    deriveSchemaNodeAtPointer(key: string, data?: object): SchemaNode;
}
//# sourceMappingURL=UiStore.d.ts.map