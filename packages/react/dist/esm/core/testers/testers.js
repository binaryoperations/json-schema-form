import { cast } from '../internals/cast';
import { get } from '../internals/object';
export const and = (...functions) => {
    return (...arg) => functions.every((func) => func(...arg));
};
export const or = (...functions) => {
    return (...arg) => functions.some((func) => func(...arg));
};
export const ranked = (...functions) => {
    return (...arg) => {
        let counter = 0;
        for (const nextFunc of functions) {
            const resolution = nextFunc(...arg);
            if (+resolution <= 0)
                return -1;
            counter += +resolution;
        }
        return counter;
    };
};
/**
 *
 * Ui Schema Tester
 */
export const uiSchemaMatches = (predicate) => {
    return (_, uiSchema) => predicate(uiSchema);
};
const isType = (type) => {
    return uiSchemaMatches((uiSchema) => uiSchema.type === type);
};
export const hasFieldSets = isType('fieldsets');
export const isFieldSet = isType('fieldset');
export const hasRows = isType('rows');
export const hasColumns = isType('columns');
export const isControl = isType('control');
export const optionIs = (property, expectedValue) => and(isControl, uiSchemaMatches((uiSchema) => get(cast(uiSchema).options, property) === expectedValue));
export const optionStartsWith = (property, expectedValue) => and(isControl, uiSchemaMatches((uiSchema) => {
    const value = get(cast(uiSchema).options, property);
    return typeof value === 'string' && value.startsWith(expectedValue);
}));
/**
 *
 * Schema Testers
 *
 */
/**
 *
 * @param schema {Schema}
 * @returns boolean
 */
export const checkInferableOneOfNotNullSchema = (tester) => (schema, ...rest) => {
    if (tester(schema, ...rest))
        return true;
    if (!Array.isArray(schema.oneOf))
        return false;
    const filteredSchema = schema.oneOf.filter((s) => s.type !== 'null');
    return filteredSchema.length === 1 && tester(filteredSchema[0], ...rest);
};
export const checkInferableAnyOfNotNullSchema = (tester) => (schema, ...rest) => {
    if (tester(schema, ...rest))
        return true;
    if (!Array.isArray(schema.anyOf))
        return false;
    const filteredSchema = schema.anyOf.filter((s) => s.type !== 'null');
    return filteredSchema.length === 1 && tester(filteredSchema[0], ...rest);
};
export const isStringSchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema((schema) => schema.type === 'string'));
export const isNumberSchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema((schema) => schema.type === 'number'));
export const isBooleanSchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema((schema) => schema.type === 'boolean'));
export const isNullSchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema((schema) => schema.type === 'null'));
export const isObjectSchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema((schema) => schema.type === 'object'));
export const isArraySchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema((schema) => schema.type === 'array'));
/**
 *
 * Option Testers
 *
 */
export const formatIs = (expectedValue) => {
    return (schema) => {
        return get(cast(schema), 'format') === expectedValue;
    };
};
/**
 *
 * Rank Testers
 *
 */
export const createRankedTester = (...testers) => ranked(isControl, ...testers);
export const isTextRanked = createRankedTester(isStringSchema);
export const isArrayRanked = createRankedTester(isArraySchema);
export const isBooleanRanked = createRankedTester(isBooleanSchema);
export const isNumberRanked = createRankedTester(isNumberSchema);
export const isDateRanked = ranked(isTextRanked, or(formatIs('date'), optionIs('format', 'date'), optionStartsWith('format', 'date')));
export const isTimeRanked = ranked(isTextRanked, or(formatIs('time'), optionIs('format', 'time')));
//# sourceMappingURL=testers.js.map