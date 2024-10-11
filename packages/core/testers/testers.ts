import type {
  ArrayJsonSchema,
  BooleanJsonSchema,
  JsonSchema,
  NullJsonSchema,
  NumberJsonSchema,
  ObjectJsonSchema,
  StringJsonSchema,
} from '../models/JsonSchema';

import { ControlNode, FieldsetNode, type UiSchema } from '../models/UiSchema';
import { get } from '@binaryoperations/json-forms-internals/object';
import { cast } from '@binaryoperations/json-forms-internals/cast';

export type Tester = (
  schema: JsonSchema,
  uiSchema: UiSchema | FieldsetNode,
  context: { rootSchema: JsonSchema }
) => boolean;

export type Ranker = (
  schema: JsonSchema,
  uiSchema: UiSchema | FieldsetNode,
  context: { rootSchema: JsonSchema }
) => number;

export const and = (...functions: Tester[]): Tester => {
  return (...arg) => functions.every((func) => func(...arg));
};

export const or = (...functions: Tester[]): Tester => {
  return (...arg) => functions.some((func) => func(...arg));
};

export const ranked = (...functions: (Tester | Ranker)[]): Ranker => {
  return (...arg) => {
    let counter = 0;

    for (const nextFunc of functions) {
      const resolution = nextFunc(...arg);
      if (+resolution <= 0) return -1;
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
  predicate: (uiSchema: UiSchema | FieldsetNode) => boolean
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
 * @param schema {JsonSchema}
 * @returns boolean
 */
export const isStringSchema: Tester = (schema): schema is StringJsonSchema =>
  schema.type === 'string';

export const isNumberSchema: Tester = (schema): schema is NumberJsonSchema =>
  schema.type === 'number';

export const isBooleanSchema: Tester = (schema): schema is BooleanJsonSchema =>
  schema.type === 'boolean';

export const isNullSchema: Tester = (schema): schema is NullJsonSchema =>
  schema.type === 'null';

export const isObjectSchema: Tester = (schema): schema is ObjectJsonSchema =>
  schema.type === 'object';

export const isArraySchema: Tester = (schema): schema is ArrayJsonSchema =>
  schema.type === 'array';

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

export const isDateRanked = ranked(
  isTextRanked,
  or(
    formatIs('date'),
    optionIs('format', 'date'),
    optionStartsWith('format', 'date')
  )
);

export const isTimeRanked = ranked(
  isTextRanked,
  or(formatIs('time'), optionIs('format', 'time'))
);
