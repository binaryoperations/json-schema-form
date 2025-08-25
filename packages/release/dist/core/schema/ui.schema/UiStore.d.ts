import { ControlNodeType, LayoutSchema } from '../../models/LayoutSchema';
import { LogicalSchema, SchemaNode } from '../logical.schema/Parser';
import type { DataNode } from 'json-schema-library/dist/src/methods/toDataNodes';
export type { SchemaNode };
type Extensions = {
    required?: boolean;
    parent?: string;
};
export type ExtendedLayoutSchema = LayoutSchema & Extensions;
export type ExtendedControlSchema = ControlNodeType & Extensions;
export declare class UiStore {
    private draftSchema;
    keyMap: Record<string, ExtendedLayoutSchema>;
    pathMap: Record<string, ExtendedControlSchema>;
    tree: Record<string, string[]>;
    private $$dataNodesCache;
    constructor(draftSchema: LogicalSchema);
    get rootSchema(): SchemaNode & {
        cache: WeakMap<object, object>;
    };
    getChildren(key: string): string[];
    getNode(key: string): ExtendedLayoutSchema;
    getNodeByPath(path: string): ExtendedControlSchema;
    getChildNodes(key: string): ExtendedLayoutSchema[];
    getChildControls(key: string): ExtendedControlSchema[];
    getNodeType(key: string): string | {};
    isControl(key: string): boolean;
    freeze(): this;
    prepareTemplate(data?: object): object | undefined;
    deriveControlSchema(key: string, data?: object): (import("../../models/ControlSchema").CompositeSchema | import("../../models/ControlSchema").StringJsonSchema | import("../../models/ControlSchema").NumberJsonSchema | import("../../models/ControlSchema").ArrayJsonSchema | import("../../models/ControlSchema").ObjectJsonSchema | import("../../models/ControlSchema").NullJsonSchema | import("../../models/ControlSchema").BooleanJsonSchema | import("../../models/ControlSchema").OneOfRootSchema | import("../../models/ControlSchema").AnyOfRootSchema) | null;
    deriveControlSchemaNode(path: string, data: object): SchemaNode;
    deriveDataNodes(data: object): Record<string, DataNode>;
    deriveDataNodeAtPath(data: object, pointer: string): DataNode;
    deriveDataAtPointer(data: object, pointer: string): {} | null;
}
//# sourceMappingURL=UiStore.d.ts.map