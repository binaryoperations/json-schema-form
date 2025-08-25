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
  private draft: SchemaNode & { cache: WeakMap<object, object> };
  private cachedDefaultValues = {};

  static prepare(schema: JsonSchema, draft?: Draft) {
    const ClassConstructor: typeof LogicalSchema = Object.assign(this);
    return new ClassConstructor(schema, draft);
  }

  get rootSchema() {
    return this.draft;
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

      const attachCache = (schemaNode: SchemaNode) => {
        const cache = new WeakMap<object, object>();
        return Object.defineProperty(schemaNode, "cache", { value: cache }) as SchemaNode & { cache: WeakMap<object, object> };
      }

    if (!("validate" in (node as SchemaNode))) {
      return attachCache(compileSchema(node, {drafts: [draft]}));
    }

      return attachCache(node as SchemaNode);
    }

  prepareTemplate<T extends Record<string, any>>(defaultValues?: T) {
    defaultValues = defaultValues ? defaultValues : this.cachedDefaultValues as T;
    if (!this.draft.cache.has(defaultValues)) {
      this.draft.cache.set(
        defaultValues,
        this.draft.getData(defaultValues, { useTypeDefaults: true, addOptionalProps: true })
      );
    }

    return this.draft.cache.get(defaultValues);
  }

  validate(value: any, schema: JsonSchema | SchemaNode = this.draft) {
    const schemaNode = this.deriveSchemaNode(schema);
    const {valid, errors} = schemaNode.validate(value);

    return {
      isValid: valid,
      errors,
    };
  }

  getSchemaOf(pointer: string, data: Record<string, any> = {}) {
    return this.getSchemaNodeOf(pointer, data).schema
  }

  getSchemaNodeOf(pointer: string, data: Record<string, any> = {}) {
    const schemaNode = this.draft.getNode(pointer, data, { pointer });

    if (schemaNode.error)
      throw new Error(schemaNode.error.message, { cause: schemaNode.error });

    return schemaNode.node!;
  }
}
