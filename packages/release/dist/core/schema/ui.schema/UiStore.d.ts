import { ControlSchema } from '../../models/ControlSchema';
import { ControlNodeType, LayoutSchema } from '../../models/LayoutSchema';
import { LogicalSchema, SchemaNode } from '../logical.schema/Parser';
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
    constructor(draftSchema: LogicalSchema);
    get rootSchema(): SchemaNode & {
        cache: WeakMap<object, object>;
    };
    get draftType(): import("json-schema-library").Draft;
    getChildren(key: string): string[];
    getNode(key: string): ExtendedLayoutSchema;
    getNodeByPath(path: string): ExtendedControlSchema;
    getChildNodes(key: string): ExtendedLayoutSchema[];
    getChildControls(key: string): ExtendedControlSchema[];
    getNodeType(key: string): string | {};
    isControl(key: string): boolean;
    freeze(): this;
    prepareTemplate(schema?: ControlSchema, data?: object): object;
    deriveControlSchema(key: string, data?: object): ControlSchema | null;
    deriveControlSchemaNode(path: string, data: object): SchemaNode;
    deriveDataNodeAtPath(data: object, pointer: string): {
        pointer: string;
        value: unknown;
    };
    deriveDataAtPointer(data: object, pointer: string): {} | null;
}
//# sourceMappingURL=UiStore.d.ts.map