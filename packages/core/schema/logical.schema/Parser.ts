import { merge, assign } from '@binaryoperations/json-forms-core/internals/object';
import {
  addKeywords,
  compileSchema,
  draft2020,
  JsonSchemaValidator,
  Keyword,
  type Draft,
  type JsonError,
  type JsonSchema,
  type SchemaNode,
} from '../../lib';
import { get } from "@sagold/json-pointer"
import { mapValues } from 'lodash';
import { getNode } from './nodeStore';
import { getDefaultKeywords } from '@binaryoperations/json-forms-core/utils/keywords';
import { extendDraft } from 'json-schema-library';


export { JsonError, SchemaNode };




export class LogicalSchema {
  private static counter = 0;
  static prepare(schema: JsonSchema, draft?: Draft) {
    const ClassConstructor: typeof LogicalSchema = Object.assign(this);
    return new ClassConstructor(schema, draft);
  }

  declare private readonly $$id;
  declare private readonly $$draftType: Draft;
  declare private readonly draftSchema: SchemaNode & { cache: WeakMap<object, object> };

  declare beforeValidate?: () => void;
  declare afterValidate?: () => void;


  declare private schemaCache: Map<string, SchemaNode>;

  get uniqueId() {
    const id = this.$$id;
    return id
  }

  get rootSchema() {
    return this.draftSchema;
  }

  get draftType() {
    return this.$$draftType;
  }

  constructor(
    schema: JsonSchema | SchemaNode,
    draft: Draft = draft2020,
  ) {
    this.$$id = ++LogicalSchema.counter;

    this.$$draftType = draft;

    this.draftSchema = this.deriveSchemaNode(schema, draft);
    this.schemaCache = new Map<string, SchemaNode>();
  }

  private prepareValidator = (validator: JsonSchemaValidator): JsonSchemaValidator => (data) => {
    const result = validator(assign(data, { uiNode: getNode(data.pointer) }));
    return result;
  }

  private prepareKeywords = (keywords: Keyword[]) => {
    return keywords.map((keyword) => ({...keyword, validate: keyword.validate && this.prepareValidator(keyword.validate)}))
  }

  deriveSchemaNode(
    node: SchemaNode | JsonSchema,
    draft: Draft = this.$$draftType) {

    const attachCache = <T extends SchemaNode = SchemaNode>(schemaNode:  T) => {
      if ("cache" in schemaNode && schemaNode.cache) return schemaNode as T & { cache: WeakMap<object, object> };

      const cache = new WeakMap<object, object>();
      return Object.defineProperty(schemaNode, "cache", { value: cache }) as T & { cache: WeakMap<object, object> };
    }

    if (!("schema" in (node as SchemaNode))) {
      let extendedDraft = extendDraft(draft, {
        formats: mapValues(draft.formats, this.prepareValidator),
        keywords: this.prepareKeywords(draft.keywords),
      });

      extendedDraft = addKeywords(extendedDraft, ...this.prepareKeywords(getDefaultKeywords()));

      return attachCache(compileSchema(node, { drafts: [extendedDraft] }));
    }

      return attachCache(node as SchemaNode);
  }

  getData(data: object = {}, pointer = "#" ) {
    return get(data, pointer)
  }

  prepareTemplate(controlSchema: JsonSchema | SchemaNode = this.draftSchema, data?: object) {
    if (!this.draftSchema.cache.has(controlSchema)) {
      const template = this.draftSchema.cache.set(
        controlSchema,
        this.draftSchema.getData({}, { useTypeDefaults: true, addOptionalProps: true })
      );
      this.draftSchema.cache.set(template, template);
    }

    if (data && !this.draftSchema.cache.has(data)) {
      this.draftSchema.cache.set(
        data,
        merge({}, this.draftSchema.cache.has(controlSchema), data)
      );
    }

    return this.draftSchema.cache.get(data ?? controlSchema)!;
  }

  validate = (value: any, schema: JsonSchema | SchemaNode = this.draftSchema, pointer?: string, path = pointer) => {
    this.beforeValidate?.();

    const schemaNode = this.deriveSchemaNode(schema);
    const {valid, errors} = schemaNode.validate(this.getData(value, path), pointer);

    this.afterValidate?.();

    return {
      isValid: valid,
      errors,
    };
  }

  getSchemaOf(pointer: string, data: Record<string, any> = {}) {
    return this.getSchemaNodeOf(pointer, data).schema
  }

  getSchemaNodeOf(pointer: string, data: Record<string, any> = {}) {
    if (!this.schemaCache.has(pointer)) {
      const schemaNode = this.draftSchema.getNode(pointer, data, { pointer });

      if (schemaNode.error)
        throw new Error(schemaNode.error.message, { cause: schemaNode.error });

      this.schemaCache.set(pointer, schemaNode.node!);
    }

    return this.schemaCache.get(pointer)!;
  }
}
