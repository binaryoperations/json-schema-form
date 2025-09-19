import { merge, assign } from '../../internals/object';
import { addKeywords, compileSchema, draft2020, } from '../../lib';
import { get } from "@sagold/json-pointer";
import { mapValues } from 'lodash';
import { $$getNode } from './nodeStore';
import { getDefaultKeywords } from '../../utils/keywords';
import { extendDraft } from 'json-schema-library';
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
        return this.draftSchema;
    }
    get draftType() {
        return this.$$draftType;
    }
    constructor(schema, draft = draft2020) {
        this.$$id = ++LogicalSchema.counter;
        this.$$draftType = draft;
        this.draftSchema = this.deriveSchemaNode(schema, draft);
        this.schemaCache = new Map();
    }
    prepareValidator = (validator) => (data) => {
        const result = validator(assign(data, { uiNode: $$getNode(data.pointer) }));
        return result;
    };
    prepareKeywords = (keywords) => {
        return keywords.map((keyword) => ({ ...keyword, validate: keyword.validate && this.prepareValidator(keyword.validate) }));
    };
    deriveSchemaNode(node, draft = this.$$draftType) {
        const attachCache = (schemaNode) => {
            if ("cache" in schemaNode && schemaNode.cache)
                return schemaNode;
            const cache = new WeakMap();
            return Object.defineProperty(schemaNode, "cache", { value: cache });
        };
        if (!("schema" in node)) {
            let extendedDraft = extendDraft(draft, {
                formats: mapValues(draft.formats, this.prepareValidator),
                keywords: this.prepareKeywords(draft.keywords),
            });
            extendedDraft = addKeywords(extendedDraft, ...this.prepareKeywords(getDefaultKeywords()));
            return attachCache(compileSchema(node, { drafts: [extendedDraft] }));
        }
        return attachCache(node);
    }
    getData(data = {}, pointer = "#") {
        const result = get(data, pointer);
        if (result !== undefined)
            return result;
        return this.getDefaultData(data, pointer);
    }
    getDefaultData(data = {}, pointer = "#") {
        const type = this.getSchemaOf(pointer, data)?.type;
        switch ([].concat(type).at(0)) {
            case "string":
            case "text":
                return "";
            case "number":
            case "integer":
                return null;
            case "boolean":
                return false;
            case "null":
                return null;
            case "array":
                return [];
            case "object":
                return {};
        }
        return;
    }
    prepareTemplate(controlSchema = this.draftSchema, data) {
        if (!this.draftSchema.cache.has(controlSchema)) {
            const template = this.draftSchema.cache.set(controlSchema, this.draftSchema.getData({}, { useTypeDefaults: true, addOptionalProps: true }));
            this.draftSchema.cache.set(template, template);
        }
        if (data && !this.draftSchema.cache.has(data)) {
            this.draftSchema.cache.set(data, merge({}, this.draftSchema.cache.has(controlSchema), data));
        }
        return this.draftSchema.cache.get(data ?? controlSchema);
    }
    validate = (value, schema = this.draftSchema, pointer, path = pointer) => {
        this.beforeValidate?.();
        const schemaNode = this.deriveSchemaNode(schema);
        const { valid, errors } = schemaNode.validate(this.getData(value, path), pointer);
        this.afterValidate?.();
        return {
            isValid: valid,
            errors,
        };
    };
    getSchemaOf(pointer, data = {}) {
        return this.getSchemaNodeOf(pointer, data).schema;
    }
    getSchemaNodeOf(pointer, data = {}) {
        if (!this.schemaCache.has(pointer)) {
            let schemaNode = this.draftSchema.getNode(pointer, data, { pointer });
            schemaNode = deriveNode(schemaNode).reduceNode(data);
            this.schemaCache.set(pointer, deriveNode(schemaNode));
        }
        return this.schemaCache.get(pointer);
    }
}
function deriveNode(schemaNode) {
    if (schemaNode.error)
        throw new Error(schemaNode.error.message, { cause: schemaNode.error });
    return schemaNode.node;
}
