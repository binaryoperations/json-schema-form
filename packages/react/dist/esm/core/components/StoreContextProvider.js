import { jsx as _jsx } from "react/jsx-runtime";
import UiSchemaPrepare from '@binaryoperations/json-forms-core/schema/ui.schema';
import { memo, useMemo } from 'react';
import { UiStoreContextProvider } from '../context/StoreContext';
export const StoreContextProvider = memo(function StoreContextProvider(props) {
    const uiContext = useMemo(() => {
        return {
            uiContext: UiSchemaPrepare.parse(JSON.parse(JSON.stringify(props.uiSchema))),
        };
    }, [props.uiSchema]);
    return (_jsx(UiStoreContextProvider, { value: uiContext, children: props.children }));
});
//# sourceMappingURL=StoreContextProvider.js.map