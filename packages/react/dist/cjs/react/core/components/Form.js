import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { Row } from '../../components/Semantic';
import { FormDataProvider, } from '../context/FormDataContext';
import { ComponentContextProvider, } from './ComponentContextProvider';
import { LayoutChildren } from './LayoutNode';
import { StoreContextProvider } from './StoreContextProvider';
export const Bootstrap = memo(function Bootsrap(props) {
    return (_jsx(ComponentContextProvider, { layout: props.layout, controls: props.controls, children: _jsx(StoreContextProvider, { uiSchema: props.uiSchema, children: _jsx(FormDataProvider, { value: props.data, onChange: props.onDataChange, children: _jsx(Row, { style: props.style, children: _jsx(LayoutChildren, { id: "root" }) }) }) }) }));
});
//# sourceMappingURL=Form.js.map