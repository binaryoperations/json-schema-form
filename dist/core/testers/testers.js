import { cast } from '../internals/cast';
import { get } from '../internals/object';
export const and = (...functions) => {
    return (...arg) => {
        let acc = 0;
        for (const next of functions) {
            const value = next(...arg);
            if (value <= 0)
                return 0;
            acc += value;
        }
        return acc;
    };
};
export const or = (...functions) => {
    return (...arg) => Math.max(0, ...functions.map((next) => next(...arg)));
};
export const ranked = (...functions) => {
    return (...arg) => {
        let counter = -1;
        for (const nextFunc of functions) {
            const resolution = nextFunc(...arg);
            if (+resolution <= 0)
                return counter;
            counter += +resolution;
        }
        return counter;
    };
};
/**
 *
 * Ui Schema Tester
 */
const exactEqualsType = (type, multiplier = 2) => (object) => Number(type === object.type) * multiplier;
export const uiSchemaMatches = (predicate) => {
    return (_, uiSchema) => predicate(uiSchema);
};
const isType = (type) => {
    return uiSchemaMatches(exactEqualsType(type, 1));
};
export const hasFieldSets = isType('fieldsets');
export const isFieldSet = isType('fieldset');
export const hasRows = isType('rows');
export const hasColumns = isType('columns');
export const isControl = isType('control');
export const optionIs = (property, expectedValue) => and(isControl, uiSchemaMatches((uiSchema) => +(get(cast(uiSchema).options, property) === expectedValue) * 2));
export const optionStartsWith = (property, expectedValue) => and(isControl, uiSchemaMatches((uiSchema) => {
    const value = get(cast(uiSchema).options, property);
    return +(typeof value === 'string' && value.startsWith(expectedValue));
}));
/**
 *
 * Schema Testers
 *
 */
/**
 *
 * @param schema {ControlSchema}
 * @returns boolean
 */
export const checkInferableOneOfNotNullSchema = (tester) => (schema, ...rest) => {
    const rank = tester(schema, ...rest);
    if (rank > 0)
        return rank;
    if (!Array.isArray(schema.oneOf))
        return 0;
    const filteredSchema = schema.oneOf.filter((s) => s.type !== 'null');
    return filteredSchema.length !== 1 ? 0 : tester(filteredSchema[0], ...rest);
};
export const checkInferableAnyOfNotNullSchema = (tester) => (schema, ...rest) => {
    const rank = tester(schema, ...rest);
    if (rank > 0)
        return rank;
    if (!Array.isArray(schema.anyOf))
        return 0;
    const filteredSchema = schema.anyOf.filter((s) => s.type !== 'null');
    return filteredSchema.length !== 1 ? 0 : tester(filteredSchema[0], ...rest);
};
export const isStringSchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema(exactEqualsType('string')));
export const isNumberSchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema(exactEqualsType('number')));
export const isBooleanSchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema(exactEqualsType('boolean')));
export const isNullSchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema(exactEqualsType('null')));
export const isObjectSchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema(exactEqualsType('object')));
export const isArraySchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema(exactEqualsType('array')));
/**
 *
 * Option Testers
 *
 */
export const formatIs = (expectedValue) => {
    return (schema) => (get(schema, 'format') === expectedValue ? 1 : 0);
};
export const formatStartsWith = (expectedValue) => {
    return (schema) => (get(schema, 'format')?.startsWith(expectedValue) ? 1 : 0);
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
export const isDateRanked = createRankedTester(or(exactEqualsType('string', 1), exactEqualsType('number', 1)), formatIs('date'), or(optionIs('format', 'date'), optionStartsWith('format', 'date')));
export const isDateTimeRanked = createRankedTester(formatStartsWith('date'), or(formatIs('datetime'), optionIs('format', 'datetime')), or(formatStartsWith('datetime'), optionStartsWith('format', 'datetime')));
export const isTimeRanked = createRankedTester(or(formatIs('time'), optionIs('format', 'time')));
