import { cast } from '#/internals/cast';
import { get } from '#/internals/object';

import type {
  ArrayJsonSchema,
  BooleanJsonSchema,
  ControlSchema,
  NullJsonSchema,
  NumberJsonSchema,
  ObjectJsonSchema,
  StringJsonSchema,
} from '../models/ControlSchema';
import {
  ControlNode,
  FieldsetNode,
  type LayoutSchema,
} from '../models/LayoutSchema';

export type Tester = (
  schema: ControlSchema,
  uiSchema: LayoutSchema | FieldsetNode,
  context: { rootSchema: ControlSchema }
) => boolean;

export type Ranker = (
  schema: ControlSchema,
  uiSchema: LayoutSchema | FieldsetNode,
  context: { rootSchema: ControlSchema }
) => number;

export const and = (...functions: Tester[]): Tester => {
  return (...arg) => functions.every((func) => func(...arg));
};

export const or = (...functions: Tester[]): Tester => {
  return (...arg) => functions.some((func) => func(...arg));
};

export const ranked = (...functions: (Tester | Ranker)[]): Ranker => {
  return (...arg) => {
    let counter = -1;

    for (const nextFunc of functions) {
      const resolution = nextFunc(...arg);
      if (+resolution <= 0) return counter;
      counter += +resolution;
    }

    return counter;
  };
};

/**
 *
 * Ui Schema Tester
 */

export const uiSchemaMatches = (
  predicate: (uiSchema: LayoutSchema | FieldsetNode) => boolean
): Tester => {
  return (_, uiSchema) => predicate(uiSchema);
};

const isType = (type: string): Tester => {
  return uiSchemaMatches((uiSchema) => uiSchema.type === type);
};

export const hasFieldSets: Tester = isType('fieldsets');
export const isFieldSet: Tester = isType('fieldset');
export const hasRows: Tester = isType('rows');
export const hasColumns: Tester = isType('columns');
export const isControl: Tester = isType('control');

export const optionIs = (property: string, expectedValue: unknown): Tester =>
  and(
    isControl,
    uiSchemaMatches(
      (uiSchema) =>
        get(cast<ControlNode>(uiSchema).options, property) === expectedValue
    )
  );

export const optionStartsWith = (
  property: string,
  expectedValue: string
): Tester =>
  and(
    isControl,
    uiSchemaMatches((uiSchema) => {
      const value = get(cast<ControlNode>(uiSchema).options, property);
      return typeof value === 'string' && value.startsWith(expectedValue);
    })
  );

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

export const checkInferableOneOfNotNullSchema =
  (tester: Tester): Tester =>
  (schema: ControlSchema, ...rest) => {
    if (tester(schema, ...rest)) return true;
    if (!Array.isArray(schema.oneOf)) return false;
    const filteredSchema = schema.oneOf.filter((s) => s.type !== 'null');
    return filteredSchema.length === 1 && tester(filteredSchema[0], ...rest);
  };

export const checkInferableAnyOfNotNullSchema =
  (tester: Tester): Tester =>
  (schema: ControlSchema, ...rest) => {
    if (tester(schema, ...rest)) return true;
    if (!Array.isArray(schema.anyOf)) return false;
    const filteredSchema = schema.anyOf.filter((s) => s.type !== 'null');
    return filteredSchema.length === 1 && tester(filteredSchema[0], ...rest);
  };

export const isStringSchema = checkInferableOneOfNotNullSchema(
  checkInferableAnyOfNotNullSchema(
    (schema): schema is StringJsonSchema => schema.type === 'string'
  )
);

export const isNumberSchema = checkInferableOneOfNotNullSchema(
  checkInferableAnyOfNotNullSchema(
    (schema): schema is NumberJsonSchema => schema.type === 'number'
  )
);

export const isBooleanSchema = checkInferableOneOfNotNullSchema(
  checkInferableAnyOfNotNullSchema(
    (schema): schema is BooleanJsonSchema => schema.type === 'boolean'
  )
);

export const isNullSchema = checkInferableOneOfNotNullSchema(
  checkInferableAnyOfNotNullSchema(
    (schema): schema is NullJsonSchema => schema.type === 'null'
  )
);

export const isObjectSchema = checkInferableOneOfNotNullSchema(
  checkInferableAnyOfNotNullSchema(
    (schema): schema is ObjectJsonSchema => schema.type === 'object'
  )
);

export const isArraySchema = checkInferableOneOfNotNullSchema(
  checkInferableAnyOfNotNullSchema(
    (schema): schema is ArrayJsonSchema => schema.type === 'array'
  )
);

/**
 *
 * Option Testers
 *
 */
export const formatIs = (expectedValue: unknown): Tester => {
  return (schema) => {
    return get(cast(schema), 'format') === expectedValue;
  };
};
export const formatStartsWith = (expectedValue: unknown): Tester => {
  return (schema) => {
    return !!get(cast(schema), 'format')?.startsWith(expectedValue);
  };
};

/**
 *
 * Rank Testers
 *
 */

export const createRankedTester = (...testers: (Tester | Ranker)[]) =>
  ranked(isControl, ...testers);

export const isTextRanked = createRankedTester(isStringSchema);

export const isArrayRanked = createRankedTester(isArraySchema);

export const isBooleanRanked = createRankedTester(isBooleanSchema);

export const isNumberRanked = createRankedTester(isNumberSchema);

export const isDateRanked = createRankedTester(
  isTextRanked,
  formatIs('date'),
  formatStartsWith('date'),
  or(optionIs('format', 'date'), optionStartsWith('format', 'date'))
);
export const isDateTimeRanked = createRankedTester(
  isDateRanked,
  or(formatIs('datetime'), optionIs('format', 'datetime')),
  or(formatStartsWith('datetime'), optionStartsWith('format', 'datetime'))
);

export const isTimeRanked = createRankedTester(
  isTextRanked,
  or(formatIs('time'), optionIs('format', 'time'))
);
