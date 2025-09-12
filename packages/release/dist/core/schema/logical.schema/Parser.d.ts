import { type Draft, type JsonError, type JsonSchema, type SchemaNode } from 'json-schema-library';
export { JsonError, SchemaNode };
export declare class LogicalSchema {
    private static counter;
    static prepare(schema: JsonSchema, draft?: Draft): LogicalSchema;
    private readonly $$id;
    private readonly draft;
    private schemaCache;
    get uniqueId(): number;
    get rootSchema(): SchemaNode & {
        cache: WeakMap<object, object>;
    };
    constructor(schema: JsonSchema | SchemaNode, draft?: Draft);
    private deriveSchemaNode;
    getData(data?: object, pointer?: string): any;
    prepareTemplate(controlSchema?: JsonSchema | SchemaNode, data?: object): object;
    validate(value: any, schema?: JsonSchema | SchemaNode): {
        isValid: boolean;
        errors: JsonError[];
    };
    getSchemaOf(pointer: string, data?: Record<string, any>): JsonSchema;
    getSchemaNodeOf(pointer: string, data?: Record<string, any>): SchemaNode;
}
//# sourceMappingURL=Parser.d.ts.map