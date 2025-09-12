import { merge, get } from '@binaryoperations/json-forms-core/internals/object';
import {
  compileSchema,
  draft2020,
  type Draft,
  type JsonError,
  type JsonSchema,
  type SchemaNode,
} from 'json-schema-library';
import {split} from "@sagold/json-pointer"


export { JsonError, SchemaNode };


export class LogicalSchema {
  private static counter = 0;
  static prepare(schema: JsonSchema, draft?: Draft) {
    const ClassConstructor: typeof LogicalSchema = Object.assign(this);
    return new ClassConstructor(schema, draft);
  }

  declare private readonly $$id;
  declare private readonly draft: SchemaNode & { cache: WeakMap<object, object> };


  get uniqueId() {
    const id = this.$$id;
    return id
  }


  get rootSchema() {
    return this.draft;
  }

  constructor(
    schema: JsonSchema | SchemaNode,
    draft: Draft = draft2020,
  ) {
    this.$$id = ++LogicalSchema.counter;
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

  getData(data: object = {}, pointer = "#" ) {
    const parts = split(pointer);
    return get(data, parts)
  }

  prepareTemplate(controlSchema: JsonSchema | SchemaNode = this.draft, data?: object) {
    if (!this.draft.cache.has(controlSchema)) {
      const template = this.draft.cache.set(
        controlSchema,
        this.draft.getData({}, { useTypeDefaults: true, addOptionalProps: true })
      );
      this.draft.cache.set(template, template);
    }

    if (data && !this.draft.cache.has(data)) {
      this.draft.cache.set(
        data,
        merge({}, this.draft.cache.has(controlSchema), data)
      );
    }


    return this.draft.cache.get(data ?? controlSchema)!;
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
