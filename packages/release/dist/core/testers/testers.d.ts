import type { ControlSchema } from '../models/ControlSchema';
import { type LayoutSchema } from '../models/LayoutSchema';
export type Ranker = (schema: ControlSchema, uiSchema: LayoutSchema, context: {
    rootSchema: ControlSchema;
}) => number;
export declare function and(...functions: Ranker[]): Ranker;
export declare function or(...functions: Ranker[]): Ranker;
export declare function uiSchemaMatches(predicate: (uiSchema: LayoutSchema) => number): Ranker;
export declare function isType(type: string): Ranker;
export declare const hasFieldSets: Ranker;
export declare const isFieldSet: Ranker;
export declare const hasRows: Ranker;
export declare const hasColumns: Ranker;
export declare const isControl: Ranker;
export declare function optionIs(property: string, expectedValue: unknown): Ranker;
export declare function optionStartsWith(property: string, expectedValue: string): Ranker;
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
export declare const checkInferableOneOfNotNullSchema: (tester: Ranker) => Ranker;
export declare const checkInferableAnyOfNotNullSchema: (tester: Ranker) => Ranker;
export declare const isStringSchema: Ranker;
export declare const isNumberSchema: Ranker;
export declare const isBooleanSchema: Ranker;
export declare const isNullSchema: Ranker;
export declare const isObjectSchema: Ranker;
export declare const isArraySchema: Ranker;
/**
 *
 * Option Testers
 *
 */
export declare const formatIs: (expectedValue: string) => Ranker;
export declare const formatStartsWith: (expectedValue: string) => Ranker;
/**
 *
 * Rank Testers
 *
 */
export declare const createRankedTester: (...testers: Ranker[]) => Ranker;
export declare const isTextRanked: Ranker;
export declare const isArrayRanked: Ranker;
export declare const isBooleanRanked: Ranker;
export declare const isNumberRanked: Ranker;
export declare const isDateRanked: Ranker;
export declare const isDateTimeRanked: Ranker;
export declare const isTimeRanked: Ranker;
//# sourceMappingURL=testers.d.ts.map