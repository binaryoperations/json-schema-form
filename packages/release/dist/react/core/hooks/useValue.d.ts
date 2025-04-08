type State<T> = {
    value: T | undefined;
    previousValue: T | undefined;
    initialValue: T | undefined;
};
type InternalState<T> = Partial<Record<'__READONLY__STATE__', State<T>>> & State<T>;
declare const useValue: <T>(value?: T) => InternalState<T>;
export default useValue;
//# sourceMappingURL=useValue.d.ts.map