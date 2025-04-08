/**
 *
 * @template  {function} T
 * @param {T} func
 * @returns {T}
 */
export declare const useSafeCallback: <F extends (...any: any[]) => any>(func: F) => (...args: Parameters<F>) => ReturnType<F>;
export default useSafeCallback;
//# sourceMappingURL=useSafeCallback.d.ts.map