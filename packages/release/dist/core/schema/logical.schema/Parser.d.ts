import { type Draft, type JsonError, type JsonSchema, type SchemaNode } from 'json-schema-library';
export { JsonError, SchemaNode };
export declare class LogicalSchema {
    private draft;
    private cachedDefaultValues;
    static prepare(schema: JsonSchema, draft?: Draft): LogicalSchema;
    get rootSchema(): SchemaNode & {
        cache: WeakMap<object, object>;
    };
    constructor(schema: JsonSchema | SchemaNode, draft?: Draft);
    private deriveSchemaNode;
    prepareTemplate<T extends Record<string, any>>(defaultValues?: T): object | undefined;
    validate(value: any, schema?: JsonSchema | SchemaNode): {
        isValid: boolean;
        errors: JsonError[];
    };
    getSchemaOf(pointer: string, data?: Record<string, any>): JsonSchema;
    getSchemaNodeOf(pointer: string, data?: Record<string, any>): SchemaNode;
}
//# sourceMappingURL=Parser.d.ts.map