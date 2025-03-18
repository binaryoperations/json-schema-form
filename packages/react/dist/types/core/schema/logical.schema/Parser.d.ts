import { Draft, type DraftConfig, type JsonError, type JsonSchema, type SchemaNode } from 'json-schema-library';
export { JsonError, SchemaNode };
type DraftConstructor = {
    new (schema?: JsonSchema, config?: Partial<DraftConfig>): Draft;
};
export declare class LogicalSchema {
    private draft;
    static prepare(schema: JsonSchema, DraftConstructor?: DraftConstructor): LogicalSchema;
    constructor(schema: JsonSchema, DraftConstructor?: DraftConstructor);
    prepareTemplate<T extends Record<string, any>>(defaultValues: T): any;
    validate(value: any, schema?: JsonSchema | Draft): {
        isValid: boolean;
        errors: JsonError[];
    };
    getSchemaOf(pointer: string, data?: Record<string, any>): JsonSchema;
    getSchemaNodeOf(pointer: string, data?: Record<string, any>): SchemaNode;
}
//# sourceMappingURL=Parser.d.ts.map