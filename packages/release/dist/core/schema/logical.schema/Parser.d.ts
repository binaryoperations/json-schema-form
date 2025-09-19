import { type Draft, type JsonError, type JsonSchema, type SchemaNode } from '../../lib';
export { JsonError, SchemaNode };
export declare class LogicalSchema {
    private static counter;
    static prepare(schema: JsonSchema, draft?: Draft): LogicalSchema;
    private readonly $$id;
    private readonly $$draftType;
    private readonly draftSchema;
    beforeValidate?: () => void;
    afterValidate?: () => void;
    private schemaCache;
    get uniqueId(): number;
    get rootSchema(): SchemaNode & {
        cache: WeakMap<object, object>;
    };
    get draftType(): Draft;
    constructor(schema: JsonSchema | SchemaNode, draft?: Draft);
    private prepareValidator;
    private prepareKeywords;
    deriveSchemaNode(node: SchemaNode | JsonSchema, draft?: Draft): SchemaNode & {
        cache: WeakMap<object, object>;
    };
    getData(data?: object, pointer?: string): {} | null | undefined;
    getDefaultData(data?: object, pointer?: string): {} | null | undefined;
    prepareTemplate(controlSchema?: JsonSchema | SchemaNode, data?: object): object;
    validate: (value: any, schema?: JsonSchema | SchemaNode, pointer?: string, path?: string | undefined) => {
        isValid: boolean;
        errors: JsonError[];
    };
    getSchemaOf(pointer: string, data?: Record<string, any>): JsonSchema;
    getSchemaNodeOf(pointer: string, data?: Record<string, any>): SchemaNode;
}
//# sourceMappingURL=Parser.d.ts.map