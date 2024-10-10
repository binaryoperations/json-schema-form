import isEmpty from 'lodash/isEmpty';
import {
  extractSegmentsFromPath,
  extractSchmeaSegmentsFromPath,
} from './extractSegmentsFromPath';

function resolvePath<T = any>(data: any, path: string): T {
  if (isEmpty(path)) return data;
  if (!data) return data;

  const segments = extractSegmentsFromPath(path);

  return segments.reduce((value, nextSegment) => {
    if (!value || !Object.prototype.hasOwnProperty.call(value, nextSegment))
      return undefined;

    return value[nextSegment];
  }, data);
}

function resolveSchmea<T = any>(data: any, path: string): T {
  if (isEmpty(path)) return data;
  if (!data) return data;

  const segments = extractSchmeaSegmentsFromPath(path);

  return segments.reduce((value, nextSegment) => {
    if (!value || !Object.prototype.hasOwnProperty.call(value, nextSegment))
      return undefined;

    return value[nextSegment];
  }, data);
}

export default {
  resolvePath,
  resolveSchmea,
};
