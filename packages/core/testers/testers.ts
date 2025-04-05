import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import { get } from '@binaryoperations/json-forms-core/internals/object';

import type { ControlSchema } from '../models/ControlSchema';
import {
  ControlNode,
  FieldsetNode,
  type LayoutSchema,
} from '../models/LayoutSchema';

export type Ranker = (
  schema: ControlSchema,
  uiSchema: LayoutSchema | FieldsetNode,
  context: { rootSchema: ControlSchema }
) => number;

export const and = (...functions: Ranker[]): Ranker => {
  return (...arg) => {
    let acc = 0;
    for (const next of functions) {
      const value = next(...arg);
      if (value <= 0) return 0;
      acc += value;
    }
    return acc;
  };
};

export const or = (...functions: Ranker[]): Ranker => {
  return (...arg) => Math.max(0, ...functions.map((next) => next(...arg)));
};

export const ranked = (...functions: Ranker[]): Ranker => {
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

const exactEqualsType =
  <T extends { type?: any }>(type: string, multiplier = 2) =>
  (object: T) =>
    Number(type === object.type) * multiplier;

export const uiSchemaMatches = (
  predicate: (uiSchema: LayoutSchema | FieldsetNode) => number
): Ranker => {
  return (_, uiSchema) => predicate(uiSchema);
};

const isType = (type: string): Ranker => {
  return uiSchemaMatches(exactEqualsType(type, 1));
};

export const hasFieldSets: Ranker = isType('fieldsets');
export const isFieldSet: Ranker = isType('fieldset');
export const hasRows: Ranker = isType('rows');
export const hasColumns: Ranker = isType('columns');
export const isControl: Ranker = isType('control');

export const optionIs = (property: string, expectedValue: unknown): Ranker =>
  and(
    isControl,
    uiSchemaMatches(
      (uiSchema) =>
        +(
          get(cast<ControlNode>(uiSchema).options, property) === expectedValue
        ) * 2
    )
  );

export const optionStartsWith = (
  property: string,
  expectedValue: string
): Ranker =>
  and(
    isControl,
    uiSchemaMatches((uiSchema) => {
      const value = get(cast<ControlNode>(uiSchema).options, property);
      return +(typeof value === 'string' && value.startsWith(expectedValue));
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
  (tester: Ranker): Ranker =>
  (schema: ControlSchema, ...rest) => {
    const rank = tester(schema, ...rest);
    if (rank > 0) return rank;
    if (!Array.isArray(schema.oneOf)) return 0;
    const filteredSchema = schema.oneOf.filter((s) => s.type !== 'null');

    return filteredSchema.length !== 1 ? 0 : tester(filteredSchema[0], ...rest);
  };

export const checkInferableAnyOfNotNullSchema =
  (tester: Ranker): Ranker =>
  (schema: ControlSchema, ...rest) => {
    const rank = tester(schema, ...rest);
    if (rank > 0) return rank;
    if (!Array.isArray(schema.anyOf)) return 0;
    const filteredSchema = schema.anyOf.filter((s) => s.type !== 'null');
    return filteredSchema.length !== 1 ? 0 : tester(filteredSchema[0], ...rest);
  };

export const isStringSchema = checkInferableOneOfNotNullSchema(
  checkInferableAnyOfNotNullSchema(exactEqualsType('string'))
);

export const isNumberSchema = checkInferableOneOfNotNullSchema(
  checkInferableAnyOfNotNullSchema(exactEqualsType('number'))
);

export const isBooleanSchema = checkInferableOneOfNotNullSchema(
  checkInferableAnyOfNotNullSchema(exactEqualsType('boolean'))
);

export const isNullSchema = checkInferableOneOfNotNullSchema(
  checkInferableAnyOfNotNullSchema(exactEqualsType('null'))
);

export const isObjectSchema = checkInferableOneOfNotNullSchema(
  checkInferableAnyOfNotNullSchema(exactEqualsType('object'))
);

export const isArraySchema = checkInferableOneOfNotNullSchema(
  checkInferableAnyOfNotNullSchema(exactEqualsType('array'))
);

/**
 *
 * Option Testers
 *
 */
export const formatIs = (expectedValue: string): Ranker => {
  return (schema) => (get(schema, 'format') === expectedValue ? 1 : 0);
};
export const formatStartsWith = (expectedValue: string): Ranker => {
  return (schema) => (get(schema, 'format')?.startsWith(expectedValue) ? 1 : 0);
};

/**
 *
 * Rank Testers
 *
 */

export const createRankedTester = (...testers: Ranker[]) =>
  ranked(isControl, ...testers);

export const isTextRanked = createRankedTester(isStringSchema);

export const isArrayRanked = createRankedTester(isArraySchema);

export const isBooleanRanked = createRankedTester(isBooleanSchema);

export const isNumberRanked = createRankedTester(isNumberSchema);

export const isDateRanked = createRankedTester(
  or(exactEqualsType('string', 1), exactEqualsType('number', 1)),
  formatIs('date'),
  or(optionIs('format', 'date'), optionStartsWith('format', 'date'))
);
export const isDateTimeRanked = createRankedTester(
  formatStartsWith('date'),
  or(formatIs('datetime'), optionIs('format', 'datetime')),
  or(formatStartsWith('datetime'), optionStartsWith('format', 'datetime'))
);

export const isTimeRanked = createRankedTester(
  or(formatIs('time'), optionIs('format', 'time'))
);
