import fpSet from 'lodash/fp/set';
import fpPick from 'lodash/fp/pick';
import uniq from 'lodash/uniq';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';
import maxBy from 'lodash/maxBy';
import merge from 'lodash/merge';
import orderBy from 'lodash/orderBy';
import cloneDeep from 'lodash/cloneDeep';
import type _set from 'lodash/set';
import noop from 'lodash/noop';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

export { default as fastDeepEqual } from 'fast-deep-equal';

import { extractSegmentsFromPath } from './extractSegmentsFromPath';

export { get, groupBy, keyBy, maxBy, fpPick, cloneDeep, noop, orderBy, debounce, isEmpty, uniq, merge };

export const set: typeof _set = (data: object, path: string, value: any) => {
  if (Object.is(get(data, path), value)) return data;
  return fpSet(extractSegmentsFromPath(path), value, data);
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x: unknown, y: unknown) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / (y as number);
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
export function shallowCompare(objA?: unknown, objB?: unknown) {
  if (is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !is(
        (objA as Record<string, unknown>)[keysA[i]],
        (objB as Record<string, unknown>)[keysA[i]]
      )
    ) {
      return false;
    }
  }

  return true;
}

export default {
  set,
  shallowCompare,
};
