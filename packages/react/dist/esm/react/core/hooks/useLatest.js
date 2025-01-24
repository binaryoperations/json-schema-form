import { useRef } from './useRef';
export const useLatest = (value) => {
    const ref = useRef(value);
    ref.current = value;
    return ref;
};
export default useLatest;
//# sourceMappingURL=useLatest.js.map