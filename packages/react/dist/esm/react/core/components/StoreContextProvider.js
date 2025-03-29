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
//# sourceMappingURL=StoreContextProvider.js.map