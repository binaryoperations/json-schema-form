import type { Schema } from '../models/ControlSchema';
import { FieldsetNode, type LayoutSchema } from '../models/LayoutSchema';
export type Tester = (schema: Schema, uiSchema: LayoutSchema | FieldsetNode, context: {
    rootSchema: Schema;
}) => boolean;
export type Ranker = (schema: Schema, uiSchema: LayoutSchema | FieldsetNode, context: {
    rootSchema: Schema;
}) => number;
export declare const and: (...functions: Tester[]) => Tester;
export declare const or: (...functions: Tester[]) => Tester;
export declare const ranked: (...functions: (Tester | Ranker)[]) => Ranker;
/**
 *
 * Ui Schema Tester
 */
export declare const uiSchemaMatches: (predicate: (uiSchema: LayoutSchema | FieldsetNode) => boolean) => Tester;
export declare const hasFieldSets: Tester;
export declare const isFieldSet: Tester;
export declare const hasRows: Tester;
export declare const hasColumns: Tester;
export declare const isControl: Tester;
export declare const optionIs: (property: string, expectedValue: unknown) => Tester;
export declare const optionStartsWith: (property: string, expectedValue: string) => Tester;
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
export declare const isStringSchema: Tester;
export declare const isNumberSchema: Tester;
export declare const isBooleanSchema: Tester;
export declare const isNullSchema: Tester;
export declare const isObjectSchema: Tester;
export declare const isArraySchema: Tester;
/**
 *
 * Option Testers
 *
 */
export declare const formatIs: (expectedValue: unknown) => Tester;
/**
 *
 * Rank Testers
 *
 */
export declare const createRankedTester: (...testers: (Tester | Ranker)[]) => Ranker;
export declare const isTextRanked: Ranker;
export declare const isArrayRanked: Ranker;
export declare const isBooleanRanked: Ranker;
export declare const isNumberRanked: Ranker;
export declare const isDateRanked: Ranker;
export declare const isTimeRanked: Ranker;
//# sourceMappingURL=testers.d.ts.map