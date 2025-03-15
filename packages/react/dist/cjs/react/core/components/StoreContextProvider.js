import { jsx as _jsx } from "react/jsx-runtime";
import LogicalSchema from '../../../core/schema/logical.schema';
import UiSchema from '../../../core/schema/ui.schema';
import { memo, useMemo } from 'react';
import { UiStoreContextProvider } from '../context/StoreContext';
export const StoreContextProvider = memo(function StoreContextProvider(props) {
    const schemaDraft = useMemo(() => LogicalSchema.parse(props.schema), [props.schema]);
    const uiContext = useMemo(() => ({
        uiContext: UiSchema.prepare(JSON.parse(JSON.stringify(props.uiSchema)), schemaDraft),
    }), [props.uiSchema, schemaDraft]);
    return (_jsx(UiStoreContextProvider, { value: uiContext, children: props.children }));
});
//# sourceMappingURL=StoreContextProvider.js.map