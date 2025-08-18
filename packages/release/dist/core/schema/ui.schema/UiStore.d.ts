import { ControlNodeType, LayoutSchema } from '../../models/LayoutSchema';
import { LogicalSchema, SchemaNode } from '../logical.schema/Parser';
import type { DataNode } from 'json-schema-library/dist/src/methods/toDataNodes';
export type { SchemaNode };
export declare class UiStore {
    private draftSchema;
    keyMap: Record<string, LayoutSchema>;
    tree: Record<string, string[]>;
    private $$dataCache;
    constructor(draftSchema: LogicalSchema);
    get rootSchema(): SchemaNode;
    getChildren(key: string): string[];
    getNode(key: string): LayoutSchema;
    getChildNodes(key: string): LayoutSchema[];
    getChildControls(key: string): ControlNodeType<object, object>[];
    getNodeType(key: string): string | {};
    isControl(key: string): boolean;
    freeze(): this;
    prepareTemplate(data?: object): any;
    deriveControlSchema(key: string, data?: object): (import("../../models/ControlSchema").CompositeSchema | import("../../models/ControlSchema").StringJsonSchema | import("../../models/ControlSchema").NumberJsonSchema | import("../../models/ControlSchema").ArrayJsonSchema | import("../../models/ControlSchema").ObjectJsonSchema | import("../../models/ControlSchema").NullJsonSchema | import("../../models/ControlSchema").BooleanJsonSchema | import("../../models/ControlSchema").OneOfRootSchema | import("../../models/ControlSchema").AnyOfRootSchema) | null;
    deriveControlSchemaNode(path: string, data?: object): SchemaNode;
    deriveDataNodes(data: object): Record<string, DataNode>;
    deriveDataNodeAtPath(data: object, pointer: string): DataNode;
    deriveDataAtPointer(data: object, pointer: string): {} | null;
}
//# sourceMappingURL=UiStore.d.ts.map