import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment, memo, useMemo } from 'react';
import { RendererContextProvider, } from '../context/RendererContext';
import { UiNodeType } from '../../../core/models';
import { createCustomLayoutRenderer } from '../hoc/createRenderer';
const CustomLayoutRenderer = createCustomLayoutRenderer(Fragment);
export const ComponentContextProvider = memo(function ComponentContextProvider(props) {
    const contextValue = useMemo(() => {
        const layout = (UiNodeType['CUSTOM'] in props.layout)
            ? props.layout
            : { ...props.layout, [UiNodeType['CUSTOM']]: CustomLayoutRenderer };
        return ({
            layout,
            controls: props.controls,
        });
    }, [props.controls, props.layout]);
    return (_jsx(RendererContextProvider, { value: contextValue, children: props.children }));
});
//# sourceMappingURL=ComponentContextProvider.js.map