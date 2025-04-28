import {
  compileSchema,
  type Draft,
  draft2020,
  type JsonError,
  type JsonSchema,
  type SchemaNode,
} from 'json-schema-library';

export { JsonError, SchemaNode };

export class LogicalSchema {
  private draft: SchemaNode;

  static prepare(schema: JsonSchema, draft?: Draft) {
    const ClassConstructor: typeof LogicalSchema = Object.assign(this);
    return new ClassConstructor(schema, draft);
  }

  constructor(
    schema: JsonSchema | SchemaNode,
    draft: Draft = draft2020
  ) {
    this.draft = this.deriveSchemaNode(schema, draft);
  }

  private deriveSchemaNode(
    node: SchemaNode | JsonSchema,
    draft: Draft = draft2020) {

    if (!("validate" in (node as SchemaNode))) {
      return compileSchema(node, {drafts: [draft]});
    }

      return node as SchemaNode;
    }

  prepareTemplate<T extends Record<string, any>>(defaultValues?: T) {
    return this.draft.getData(defaultValues);
  }

  validate(value: any, schema: JsonSchema | SchemaNode = this.draft) {
    const schemaNode = this.deriveSchemaNode(schema);
    const {valid, errors} = schemaNode.validate(value);

    return {
      isValid: !valid,
      errors,
    };
  }

  getSchemaOf(pointer: string, data: Record<string, any> = {}) {
    return this.getSchemaNodeOf(pointer, data).schema
  }

  getSchemaNodeOf(pointer: string, data: Record<string, any> = {}) {
    const schemaNode = this.draft.getNode(pointer, data);

    if (schemaNode.error)
      throw new Error(schemaNode.error.message, { cause: schemaNode.error });

    return schemaNode.node!;
  }
}
