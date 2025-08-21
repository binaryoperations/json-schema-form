import fpPick from 'lodash/fp/pick';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';
import maxBy from 'lodash/maxBy';
import orderBy from 'lodash/orderBy';
import cloneDeep from 'lodash/cloneDeep';
import type _set from 'lodash/set';
import noop from 'lodash/noop';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
export { default as fastDeepEqual } from 'fast-deep-equal';
export { get, groupBy, keyBy, maxBy, fpPick, cloneDeep, noop, orderBy, debounce, isEmpty };
export declare const set: typeof _set;
/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
export declare function shallowCompare(objA?: unknown, objB?: unknown): boolean;
declare const _default: {
    set: {
        <T extends object>(object: T, path: import("lodash").PropertyPath, value: any): T;
        <TResult>(object: object, path: import("lodash").PropertyPath, value: any): TResult;
    };
    shallowCompare: typeof shallowCompare;
};
export default _default;
//# sourceMappingURL=object.d.ts.map