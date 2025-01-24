import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useMemo } from 'react';
import { RendererContextProvider, } from '../context/RendererContext';
export const ComponentContextProvider = memo(function ComponentContextProvider(props) {
    const contextValue = useMemo(() => ({
        layout: props.layout,
        controls: props.controls,
    }), [props.controls, props.layout]);
    return (_jsx(RendererContextProvider, { value: contextValue, children: props.children }));
});
//# sourceMappingURL=ComponentContextProvider.js.map