import { compileSchema, draft2020, } from 'json-schema-library';
export class LogicalSchema {
    draft;
    static prepare(schema, draft) {
        const ClassConstructor = Object.assign(this);
        return new ClassConstructor(schema, draft);
    }
    get rootSchema() {
        return this.draft;
    }
    constructor(schema, draft = draft2020) {
        this.draft = this.deriveSchemaNode(schema, draft);
    }
    deriveSchemaNode(node, draft = draft2020) {
        if (!("validate" in node)) {
            return compileSchema(node, { drafts: [draft] });
        }
        return node;
    }
    prepareTemplate(defaultValues) {
        return this.draft.getData(defaultValues, { useTypeDefaults: true });
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
        const schemaNode = this.draft.getNode(pointer, data, { pointer });
        if (schemaNode.error)
            throw new Error(schemaNode.error.message, { cause: schemaNode.error });
        return schemaNode.node;
    }
}
