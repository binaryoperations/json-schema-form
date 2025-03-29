import { useCallback } from 'react';
import useValue from './useValue';
/**
 *
 * @template  {function} T
 * @param {T} func
 * @returns {T}
 */
export const useSafeCallback = (func) => {
    const latestFunc = useValue(func);
    if (typeof func !== 'function')
        throw new Error('useSafeCallback accepts exactly one argument of type function');
    return useCallback((...args) => {
        // there is a posibility that the latest function has been called AFTER unmount.
        return latestFunc.value?.(...args);
    }, [latestFunc]);
};
export default useSafeCallback;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlU2FmZUNhbGxiYWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29yZS9ob29rcy91c2VTYWZlQ2FsbGJhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUVwQyxPQUFPLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFFbEM7Ozs7O0dBS0c7QUFFSCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsQ0FBbUMsSUFBTyxFQUFFLEVBQUU7SUFDM0UsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLElBQUksT0FBTyxJQUFJLEtBQUssVUFBVTtRQUM1QixNQUFNLElBQUksS0FBSyxDQUNiLCtEQUErRCxDQUNoRSxDQUFDO0lBRUosT0FBTyxXQUFXLENBQ2hCLENBQUMsR0FBRyxJQUFtQixFQUFFLEVBQUU7UUFDekIsZ0ZBQWdGO1FBQ2hGLE9BQU8sVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFrQixDQUFDO0lBQ3RELENBQUMsRUFDRCxDQUFDLFVBQVUsQ0FBQyxDQUNiLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixlQUFlLGVBQWUsQ0FBQyJ9