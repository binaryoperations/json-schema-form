import { cast } from '../internals/cast';
import { get } from '../internals/object';
export function and(...functions) {
    return Object.defineProperties(function (...arg) {
        let acc = 0;
        for (const nextFunc of functions) {
            const resolution = nextFunc(...arg);
            if (+resolution <= 0)
                return 0;
            acc += resolution;
        }
        return acc;
    }, {
        handlers: { value: functions, },
        name: { value: `And(${functions.map((f) => f.name || "Unknown").join(', ')})`, writable: true },
    });
}
;
export function or(...functions) {
    return Object.defineProperties(function OR(...arg) {
        return Math.max(0, ...functions.map((next) => next(...arg)));
    }, {
        handlers: { value: functions, },
        name: { value: `OR(${functions.map((f) => f.name || "Unknown").join(', ')})`, writable: true },
    });
}
;
/**
 *
 * Ui Schema Tester
 */
function exactEqualsType(type, multiplier = 2) {
    return Object.defineProperties(function ExactEqualsType(object) {
        return Number(type === object.type) * multiplier;
    }, { name: { value: `ExactEqualsType(${type})`, writable: true } });
}
export function uiSchemaMatches(predicate) {
    return Object.defineProperties(function UiSchemaMatches(_, uiSchema) {
        return predicate(cast(uiSchema));
    }, { name: { value: `UiSchemaMatches(${predicate.name || "Unknown"})`, writable: true } });
}
;
export function schemaMatches(predicate) {
    return Object.defineProperties(function SchemaMatches(schema) {
        return predicate(schema);
    }, { name: { value: `SchemaMatches(${predicate.name || "Unknown"})`, writable: true } });
}
;
export function isType(type) {
    return uiSchemaMatches(exactEqualsType(type, 1));
}
;
export const hasFieldSets = isType('fieldsets');
export const isFieldSet = isType('fieldset');
export const hasRows = isType('rows');
export const hasColumns = isType('columns');
export const isControl = isType('control');
export function optionIs(property, expectedValue) {
    const func = Object.defineProperties(and(isControl, uiSchemaMatches(Object.assign((uiSchema) => +(get((uiSchema).options, property) === expectedValue) * 2, { name: `TestUiOption(${property}===${expectedValue})` }))), {
        property: { value: property },
        expectedValue: { value: expectedValue },
    });
    Object.assign(func, {
        name: `optionIs(${property}, ${expectedValue})`
    });
    return func;
}
;
export function schemaOptionIs(property, expectedValue) {
    const func = Object.defineProperties(and(isControl, schemaMatches(Object.assign(((schema) => +(get(schema, property) === expectedValue) * 2), { name: `TestSchema(${property}===${expectedValue})` }))), {
        property: { value: property },
        expectedValue: { value: expectedValue },
    });
    Object.assign(func, {
        name: `schemaOptionIs(${property}, ${expectedValue})`
    });
    return func;
}
;
export function optionStartsWith(property, expectedValue) {
    const func = Object.defineProperties(and(isControl, uiSchemaMatches(Object.assign((uiSchema) => {
        const value = get(uiSchema.options, property);
        return +(typeof value === 'string' && value.startsWith(expectedValue));
    }, { name: `TestUiOptionStartsWith(${expectedValue})` }))), {
        property: { value: property },
        expectedValue: { value: expectedValue },
    });
    Object.assign(func, {
        name: `OptionStartsWith(${property}, ${expectedValue})`
    });
    return func;
}
;
export function schemaOptionStartsWith(property, expectedValue) {
    const func = Object.defineProperties(and(isControl, uiSchemaMatches(Object.assign((uiSchema) => {
        const value = get(uiSchema.options, property);
        return +(typeof value === 'string' && value.startsWith(expectedValue));
    }, { name: `TestSchemaOptionStartsWith(${expectedValue})` }))), {
        property: { value: property },
        expectedValue: { value: expectedValue },
    });
    Object.assign(func, {
        name: `schemaOptionStartsWith(${property}, ${expectedValue})`
    });
    return func;
}
;
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
export const checkInferableOneOfNotNullSchema = (tester) => {
    return Object.defineProperties(function (schema, ...rest) {
        const rank = tester(schema, ...rest);
        if (rank > 0)
            return rank;
        if (!Array.isArray(schema.oneOf))
            return 0;
        const filteredSchema = schema.oneOf.filter((s) => s.type !== 'null');
        return filteredSchema.length !== 1 ? 0 : tester(filteredSchema[0], ...rest);
    }, {
        name: { value: `checkInferableOneOfNotNullSchema(${tester.name})`, writable: true },
    });
};
export const checkInferableAnyOfNotNullSchema = (tester) => Object.defineProperties(function (schema, ...rest) {
    const rank = tester(schema, ...rest);
    if (rank > 0)
        return rank;
    if (!Array.isArray(schema.anyOf))
        return 0;
    const filteredSchema = schema.anyOf.filter((s) => s.type !== 'null');
    return filteredSchema.length !== 1 ? 0 : tester(filteredSchema[0], ...rest);
}, {
    name: { value: `checkInferableAnyOfNotNullSchema(${tester.name})`, writable: true },
});
export const isStringSchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema(exactEqualsType('string')));
export const isNumberSchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema(exactEqualsType('number')));
export const isBooleanSchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema(exactEqualsType('boolean')));
export const isNullSchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema(exactEqualsType('null')));
export const isObjectSchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema(exactEqualsType('object')));
export const isArraySchema = checkInferableOneOfNotNullSchema(checkInferableAnyOfNotNullSchema(exactEqualsType('array')));
/**
 *
 * Rank Testers
 *
 */
export const createRankedTester = (...testers) => and(...testers);
export const isTextRanked = createRankedTester(isStringSchema);
export const isArrayRanked = createRankedTester(isArraySchema);
export const isBooleanRanked = createRankedTester(isBooleanSchema);
export const isNumberRanked = createRankedTester(isNumberSchema);
export const isDateRanked = createRankedTester(or(exactEqualsType('string', 1), exactEqualsType('number', 1)), or(optionIs('format', 'date'), optionStartsWith('format', 'date'), schemaOptionIs("format", 'date'), schemaOptionStartsWith("format", 'date')));
export const isDateTimeRanked = createRankedTester(or(optionIs('format', 'datetime'), optionStartsWith('format', 'datetime'), schemaOptionIs("format", 'datetime'), schemaOptionStartsWith("format", 'datetime')));
export const isTimeRanked = createRankedTester(or(optionIs("format", 'time'), optionStartsWith('format', 'time'), schemaOptionIs("format", 'time'), schemaOptionStartsWith("format", 'time')));
