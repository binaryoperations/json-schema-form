import { cast } from '../../../core/internals/cast';
import { set, shallowCompare, } from '../../../core/internals/object';
import resolvers from '../../../core/internals/resolvers';
import { useCallback } from 'react';
import { ControlContext } from '../context/ControlContext';
import { useFormDataContext, useFormDataRef } from '../context/FormDataContext';
import { useUiStoreContext, useUiStoreRef, } from '../context/StoreContext';
import { useInvariantContext } from './useInvariantContext';
import { useStore } from './useStore';
import useValue from './useValue';
const useInvariantControl = (message) => useInvariantContext(ControlContext, message);
/**
 *
 * Read the UI node for the current control
 *
 */
export function useControl(selector, equalityCheck = Object.is) {
    const currentControlId = useInvariantControl('useControl can only be called inside ControlContext');
    return useStore((store) => {
        return selector(cast(store.uiContext.getNode(currentControlId)));
    }, equalityCheck);
}
/**
 *
 * Read the schema of the control
 *
 */
export function useControlSchema(selector, equalityCheck) {
    const currentControl = useInvariantControl('useControlSchema can only be called inside ControlContext');
    const formDataRef = useFormDataRef();
    return useStore((store) => {
        return selector(store.uiContext.deriveSchemaAtPointer(currentControl, formDataRef.current));
    }, equalityCheck)[0];
}
/**
 *
 * Read the schema of the control
 *
 */
export function useControlValue(path) {
    const [value, setFormData] = useFormDataContext((data) => resolvers.resolvePath(data, path), shallowCompare);
    const setDirty = useUiStoreRef().current.setDirty;
    const validate = useValidateData(path, 'onChange');
    return [
        value,
        useCallback((value) => {
            setFormData((oldValue) => set(oldValue, path, value));
            setDirty(path, value);
            validate(value);
        }, [validate, path, setFormData, setDirty]),
    ];
}
export function useControlProps(path, props) {
    const { onBlur, onFocus } = props;
    const validate = useValidateData(path, 'onBlur');
    const setTouched = useUiStoreRef().current.setTouched;
    const [value, setValue] = useControlValue(path);
    const proxyValue = useValue(value);
    const [meta] = useUiStoreContext((state) => {
        const schemaNodePointer = state.uiContext.deriveSchemaNodeAtPointer(path)?.pointer;
        return {
            touched: state.touchedControlPaths.has(schemaNodePointer),
            dirty: state.dirtyControlPaths.has(schemaNodePointer),
            error: state.errors.get(schemaNodePointer)?.at(0)?.message,
        };
    }, shallowCompare);
    return {
        onBlur: useCallback((e) => {
            onBlur?.(e);
            validate(proxyValue.value);
        }, [onBlur, validate, proxyValue]),
        onFocus: useCallback((e) => {
            onFocus?.(e);
            setTouched(path);
        }, [onFocus, setTouched, path]),
        value,
        setValue,
        meta,
    };
}
function useValidateData(path, validateOn) {
    const formDataRef = useFormDataRef();
    const uiStoreRef = useUiStoreRef();
    const [validate] = useUiStoreContext((state) => state.validationMode === validateOn ? state.validate : undefined);
    return useCallback((value) => {
        if (!validate)
            return;
        const shouldReset = validateOn === 'onSubmit';
        const schema = uiStoreRef.current.uiContext.deriveSchemaNodeAtPointer(path).schema;
        const validateResult = shouldReset
            ? validate(value ?? formDataRef.current, schema)
            : validate(value, schema);
        uiStoreRef.current.setErrors(path, validateResult.isValid ? [] : validateResult.errors, shouldReset);
    }, [path, validate, uiStoreRef, validateOn, formDataRef]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQ29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvcmUvaG9va3MvdXNlQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEUsT0FBTyxFQUNMLEdBQUcsRUFDSCxjQUFjLEdBQ2YsTUFBTSxvREFBb0QsQ0FBQztBQUM1RCxPQUFPLFNBQVMsTUFBTSx1REFBdUQsQ0FBQztBQU05RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRXBDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEYsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixhQUFhLEdBQ2QsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQztBQUVsQyxNQUFNLG1CQUFtQixHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FDOUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRS9DOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsVUFBVSxDQUN4QixRQUErQyxFQUMvQyxhQUFhLEdBQUcsTUFBTSxDQUFDLEVBQUU7SUFFekIsTUFBTSxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FDMUMscURBQXFELENBQ3RELENBQUM7SUFFRixPQUFPLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3hCLE9BQU8sUUFBUSxDQUNiLElBQUksQ0FBYyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQzdELENBQUM7SUFDSixDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQzlCLFFBQWlELEVBQ2pELGFBQWdDO0lBRWhDLE1BQU0sY0FBYyxHQUFHLG1CQUFtQixDQUN4QywyREFBMkQsQ0FDNUQsQ0FBQztJQUVGLE1BQU0sV0FBVyxHQUFHLGNBQWMsRUFBRSxDQUFDO0lBRXJDLE9BQU8sUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDeEIsT0FBTyxRQUFRLENBQ2IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FDbkMsY0FBYyxFQUNkLFdBQVcsQ0FBQyxPQUFPLENBQ25CLENBQ0gsQ0FBQztJQUNKLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxlQUFlLENBQWMsSUFBWTtJQUN2RCxNQUFNLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxHQUFHLGtCQUFrQixDQUM3QyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQzlDLGNBQWMsQ0FDZixDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQUcsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUVsRCxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRW5ELE9BQU87UUFDTCxLQUFLO1FBQ0wsV0FBVyxDQUNULENBQUMsS0FBUSxFQUFFLEVBQUU7WUFDWCxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdEQsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0QixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxFQUNELENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQ3hDO0tBQ3FDLENBQUM7QUFDM0MsQ0FBQztBQWNELE1BQU0sVUFBVSxlQUFlLENBRTdCLElBQVksRUFBRSxLQUFRO0lBQ3RCLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLE1BQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakQsTUFBTSxVQUFVLEdBQUcsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUV0RCxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVoRCxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLGlCQUFpQixDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDekMsTUFBTSxpQkFBaUIsR0FDckIsS0FBSyxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUM7UUFFM0QsT0FBTztZQUNMLE9BQU8sRUFBRSxLQUFLLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO1lBQ3pELEtBQUssRUFBRSxLQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO1lBQ3JELEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPO1NBQzNELENBQUM7SUFDSixDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFFbkIsT0FBTztRQUNMLE1BQU0sRUFBRSxXQUFXLENBQ2pCLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDSixNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVaLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUNELENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FDL0I7UUFDRCxPQUFPLEVBQUUsV0FBVyxDQUNsQixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsQ0FBQyxFQUNELENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FDNUI7UUFFRCxLQUFLO1FBQ0wsUUFBUTtRQUVSLElBQUk7S0FDTCxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsZUFBZSxDQUN0QixJQUFZLEVBQ1osVUFBZ0Q7SUFFaEQsTUFBTSxXQUFXLEdBQUcsY0FBYyxFQUFFLENBQUM7SUFDckMsTUFBTSxVQUFVLEdBQUcsYUFBYSxFQUFFLENBQUM7SUFFbkMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDN0MsS0FBSyxDQUFDLGNBQWMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FDakUsQ0FBQztJQUVGLE9BQU8sV0FBVyxDQUNoQixDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ2IsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPO1FBRXRCLE1BQU0sV0FBVyxHQUFHLFVBQVUsS0FBSyxVQUFVLENBQUM7UUFFOUMsTUFBTSxNQUFNLEdBQ1YsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRXRFLE1BQU0sY0FBYyxHQUFHLFdBQVc7WUFDaEMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7WUFDaEQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFNUIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQzFCLElBQUksRUFDSixjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQ25ELFdBQVcsQ0FDWixDQUFDO0lBQ0osQ0FBQyxFQUNELENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUN0RCxDQUFDO0FBQ0osQ0FBQyJ9