import {
  Draft,
  Draft2019,
  type DraftConfig,
  isJsonError,
  type JsonError,
  type JsonSchema,
  type SchemaNode,
} from 'json-schema-library';

export { JsonError, SchemaNode };

type DraftConstructor = {
  new (schema?: JsonSchema, config?: Partial<DraftConfig>): Draft;
};

export class LogicalSchema {
  private draft: Draft;

  static prepare(schema: JsonSchema, DraftConstructor?: DraftConstructor) {
    const ClassConstructor: typeof LogicalSchema = Object.assign(this);
    return new ClassConstructor(schema, DraftConstructor);
  }

  constructor(
    schema: JsonSchema | Draft,
    DraftConstructor: DraftConstructor = Draft2019
  ) {
    this.draft =
      schema instanceof Draft ? schema : new DraftConstructor(schema);
  }

  prepareTemplate<T extends Record<string, any>>(defaultValues: T) {
    return this.draft.getTemplate(defaultValues);
  }

  validate(value: any, schema: JsonSchema | Draft = this.draft) {
    schema = schema instanceof Draft ? schema.getSchema()! : schema;

    const errors = this.draft.validate(value, schema);

    return {
      isValid: !errors.length,
      errors,
    };
  }

  getSchemaOf(pointer: string, data: Record<string, any> = {}) {
    const schemaNode = this.draft.getSchema({ pointer, data });
    if (!schemaNode)
      throw new Error(`Schema not found for pointer: ${pointer}`);
    if (isJsonError(schemaNode))
      throw new Error(schemaNode.name, { cause: schemaNode });

    return schemaNode;
  }

  getSchemaNodeOf(pointer: string, data: Record<string, any> = {}) {
    const schemaNode = this.draft.getSchemaNode({ pointer, data });
    if (!schemaNode)
      throw new Error(`Schema not found for pointer: ${pointer}`);
    if (isJsonError(schemaNode))
      throw new Error(schemaNode.name, { cause: schemaNode });

    return schemaNode;
  }
}
