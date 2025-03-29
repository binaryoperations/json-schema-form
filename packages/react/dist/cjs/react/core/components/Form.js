import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useState } from 'react';
import { Row } from '../../components/Semantic';
import { ComponentContextProvider, } from './ComponentContextProvider';
import { FormDataProvider, } from './FormDataProvider';
import { LayoutChildren } from './LayoutNode';
import { StoreContextProvider, } from './StoreContextProvider';
export const Bootstrap = memo(function Bootsrap(props) {
    const [initialData] = useState(props.data);
    return (_jsx(ComponentContextProvider, { layout: props.layout, controls: props.controls, children: _jsx(StoreContextProvider, { uiSchema: props.uiSchema, schema: props.schema, validationMode: props.validationMode ?? 'onBlur', initialData: initialData, children: _jsx(FormDataProvider, { value: props.data, onChange: props.onDataChange, ref: props.ref, children: _jsx(Row, { style: props.style, children: _jsx(LayoutChildren, { id: "root" }) }) }) }) }));
});
//# sourceMappingURL=Form.js.map