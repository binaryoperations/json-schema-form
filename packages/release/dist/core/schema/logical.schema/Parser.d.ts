import { type Draft, type JsonError, type JsonSchema, type SchemaNode } from 'json-schema-library';
export { JsonError, SchemaNode };
export declare class LogicalSchema {
    private draft;
    static prepare(schema: JsonSchema, draft?: Draft): LogicalSchema;
    get rootSchema(): SchemaNode;
    constructor(schema: JsonSchema | SchemaNode, draft?: Draft);
    private deriveSchemaNode;
    prepareTemplate<T extends Record<string, any>>(defaultValues?: T): any;
    validate(value: any, schema?: JsonSchema | SchemaNode): {
        isValid: boolean;
        errors: JsonError[];
    };
    getSchemaOf(pointer: string, data?: Record<string, any>): JsonSchema;
    getSchemaNodeOf(pointer: string, data?: Record<string, any>): SchemaNode;
}
//# sourceMappingURL=Parser.d.ts.map