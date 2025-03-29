import { jsx as _jsx } from "react/jsx-runtime";
import LogicalSchema from '../../../core/schema/logical.schema';
import UiSchema from '../../../core/schema/ui.schema';
import { memo, useMemo } from 'react';
import { useCallback } from 'react';
import { UiStoreContextProvider } from '../context/StoreContext';
import { useControlState } from './useControlState';
export const StoreContextProvider = memo(function StoreContextProvider(props) {
    const schemaDraft = useMemo(() => LogicalSchema.parse(props.schema), [props.schema]);
    const controlState = useControlState(props.initialData, schemaDraft);
    const validate = useCallback((value, schema) => schemaDraft.validate(value, schema), [schemaDraft]);
    const uiContext = useMemo(() => UiSchema.prepare(props.uiSchema, schemaDraft), [props.uiSchema, schemaDraft]);
    const contextValue = useMemo(() => ({
        uiContext,
        validate,
        validationMode: props.validationMode,
        ...controlState,
    }), [uiContext, validate, props.validationMode, controlState]);
    return (_jsx(UiStoreContextProvider, { value: contextValue, children: props.children }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvcmVDb250ZXh0UHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb3JlL2NvbXBvbmVudHMvU3RvcmVDb250ZXh0UHJvdmlkZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxPQUFPLGFBQWEsTUFBTSx5REFBeUQsQ0FBQztBQUNwRixPQUFPLFFBQVEsTUFBTSxvREFBb0QsQ0FBQztBQUcxRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRXBDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQVVwRCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBeUIsSUFBSSxDQUM1RCxTQUFTLG9CQUFvQixDQUFDLEtBQUs7SUFDakMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUN6QixHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFDdkMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQ2YsQ0FBQztJQUVGLE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRXJFLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FDMUIsQ0FBQyxLQUFVLEVBQUUsTUFBbUIsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQ3hFLENBQUMsV0FBVyxDQUFDLENBQ2QsQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FDdkIsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxFQUNuRCxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQzlCLENBQUM7SUFFRixNQUFNLFlBQVksR0FBRyxPQUFPLENBQzFCLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDTCxTQUFTO1FBQ1QsUUFBUTtRQUNSLGNBQWMsRUFBRSxLQUFLLENBQUMsY0FBYztRQUNwQyxHQUFHLFlBQVk7S0FDaEIsQ0FBQyxFQUNGLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUMxRCxDQUFDO0lBRUYsT0FBTyxDQUNMLEtBQUMsc0JBQXNCLElBQUMsS0FBSyxFQUFFLFlBQVksWUFDeEMsS0FBSyxDQUFDLFFBQVEsR0FDUSxDQUMxQixDQUFDO0FBQ0osQ0FBQyxDQUNGLENBQUMifQ==