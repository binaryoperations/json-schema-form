import { ControlSchema } from '../../models/ControlSchema';
import { ControlNodeType, LayoutSchema } from '../../models/LayoutSchema';
import { LogicalSchema, SchemaNode } from '../logical.schema/Parser';
import { Draft, JsonSchema } from '../../lib';
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
    get draftType(): Draft;
    deriveSchemaNode(schema: JsonSchema, draft?: Draft): SchemaNode & {
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
    prepareTemplate(schema?: ControlSchema, data?: object): object;
    deriveControlSchema(key: string, data?: object): JsonSchema | null;
    deriveControlSchemaNode(path: string, data: object): SchemaNode;
    deriveDataNodeAtPath(data: object, pointer: string): {
        pointer: string;
        value: {} | null | undefined;
    };
    deriveDataAtPointer(data: object, pointer: string): {} | null;
}
//# sourceMappingURL=UiStore.d.ts.map