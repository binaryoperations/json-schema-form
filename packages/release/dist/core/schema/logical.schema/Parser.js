import { merge } from '../../internals/object';
import { compileSchema, draft2020, } from 'json-schema-library';
import { get } from "@sagold/json-pointer";
export class LogicalSchema {
    static counter = 0;
    static prepare(schema, draft) {
        const ClassConstructor = Object.assign(this);
        return new ClassConstructor(schema, draft);
    }
    get uniqueId() {
        const id = this.$$id;
        return id;
    }
    get rootSchema() {
        return this.draft;
    }
    constructor(schema, draft = draft2020) {
        this.$$id = ++LogicalSchema.counter;
        this.$$draftType = draft;
        this.draft = this.deriveSchemaNode(schema, draft);
        this.schemaCache = new Map();
    }
    get draftType() {
        return this.$$draftType;
    }
    deriveSchemaNode(node, draft = draft2020) {
        const attachCache = (schemaNode) => {
            const cache = new WeakMap();
            return Object.defineProperty(schemaNode, "cache", { value: cache });
        };
        if (!("validate" in node)) {
            return attachCache(compileSchema(node, { drafts: [draft] }));
        }
        return attachCache(node);
    }
    getData(data = {}, pointer = "#") {
        return get(data, pointer);
    }
    prepareTemplate(controlSchema = this.draft, data) {
        if (!this.draft.cache.has(controlSchema)) {
            const template = this.draft.cache.set(controlSchema, this.draft.getData({}, { useTypeDefaults: true, addOptionalProps: true }));
            this.draft.cache.set(template, template);
        }
        if (data && !this.draft.cache.has(data)) {
            this.draft.cache.set(data, merge({}, this.draft.cache.has(controlSchema), data));
        }
        return this.draft.cache.get(data ?? controlSchema);
    }
    validate(value, schema = this.draft) {
        const schemaNode = this.deriveSchemaNode(schema);
        const { valid, errors } = schemaNode.validate(value);
        return {
            isValid: valid,
            errors,
        };
    }
    getSchemaOf(pointer, data = {}) {
        return this.getSchemaNodeOf(pointer, data).schema;
    }
    getSchemaNodeOf(pointer, data = {}) {
        if (!this.schemaCache.has(pointer)) {
            const schemaNode = this.draft.getNode(pointer, data, { pointer });
            if (schemaNode.error)
                throw new Error(schemaNode.error.message, { cause: schemaNode.error });
            this.schemaCache.set(pointer, schemaNode.node);
        }
        return this.schemaCache.get(pointer);
    }
}
