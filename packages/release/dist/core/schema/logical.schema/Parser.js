import { Draft, Draft2019, isJsonError, resolveOneOfFuzzy, } from 'json-schema-library';
export class LogicalSchema {
    draft;
    static prepare(schema, DraftConstructor) {
        const ClassConstructor = Object.assign(this);
        return new ClassConstructor(schema, DraftConstructor);
    }
    constructor(schema, DraftConstructor = Draft2019) {
        this.draft =
            schema instanceof Draft
                ? schema
                : new DraftConstructor(schema, { resolveOneOf: resolveOneOfFuzzy });
    }
    prepareTemplate(defaultValues) {
        return this.draft.getTemplate(defaultValues, undefined, {
            addOptionalProps: true,
        });
    }
    validate(value, schema = this.draft) {
        schema = schema instanceof Draft ? schema.getSchema() : schema;
        const errors = this.draft.validate(value, schema);
        return {
            isValid: !errors.length,
            errors,
        };
    }
    getSchemaOf(pointer, data = {}) {
        const schemaNode = this.draft.getSchema({ pointer, data });
        if (!schemaNode)
            throw new Error(`Schema not found for pointer: ${pointer}`);
        if (isJsonError(schemaNode))
            throw new Error(schemaNode.name, { cause: schemaNode });
        return schemaNode;
    }
    getSchemaNodeOf(pointer, data = {}) {
        const schemaNode = this.draft.getSchemaNode({ pointer, data });
        if (!schemaNode)
            throw new Error(`Schema not found for pointer: ${pointer}`);
        if (isJsonError(schemaNode))
            throw new Error(schemaNode.name, { cause: schemaNode });
        return schemaNode;
    }
}
