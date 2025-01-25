/// <reference types="lodash" />
/// <reference types="lodash" />
import get from 'lodash/get';
import maxBy from 'lodash/maxBy';
import type _set from 'lodash/set';
export { get, maxBy };
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