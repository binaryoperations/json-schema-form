import {
  Draft,
  Draft2019,
  type DraftConfig,
  isJsonError,
  type JsonSchema,
} from 'json-schema-library';

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
    schema: JsonSchema,
    DraftConstructor: DraftConstructor = Draft2019
  ) {
    this.draft = new DraftConstructor(schema);
  }

  prepareTemplate<T extends Record<string, any>>(defaultValues: T) {
    return this.draft.getTemplate(defaultValues);
  }

  validate(
    value: any,
    schema: string | JsonSchema | Draft = this.draft,
    data: Record<string, any> = {}
  ) {
    if (typeof schema === 'string') {
      const schemaNode = this.getSchemaOf(schema, data);
      if (!schemaNode)
        throw new Error(`Schema not found for pointer: ${schema}`);
      schema = schemaNode;
    }

    schema = schema instanceof Draft ? schema : new Draft2019(schema);
    return this.draft.validate(value, schema);
  }

  getSchemaOf(pointer: string, data: Record<string, any> = {}) {
    const schemaNode = this.draft.getSchema({ pointer, data });
    if (!schemaNode)
      throw new Error(`Schema not found for pointer: ${pointer}`);
    if (isJsonError(schemaNode))
      throw new Error(schemaNode.name, { cause: schemaNode });

    return schemaNode;
  }
}
