import { Draft, type DraftConfig, type JsonSchema } from 'json-schema-library';
type DraftConstructor = {
    new (schema?: JsonSchema, config?: Partial<DraftConfig>): Draft;
};
export declare class LogicalSchema {
    private draft;
    static prepare(schema: JsonSchema, DraftConstructor?: DraftConstructor): LogicalSchema;
    constructor(schema: JsonSchema, DraftConstructor?: DraftConstructor);
    prepareTemplate<T extends Record<string, any>>(defaultValues: T): any;
    validate(value: any, schema?: string | JsonSchema | Draft, data?: Record<string, any>): import("json-schema-library").JsonError[];
    getSchemaOf(pointer: string, data?: Record<string, any>): JsonSchema;
}
export {};
//# sourceMappingURL=Parser.d.ts.map