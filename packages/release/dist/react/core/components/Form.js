import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useState } from 'react';
import { FormDataProvider, } from './FormDataProvider';
import { StoreContextProvider, } from './StoreContextProvider';
import { LayoutNode } from './LayoutNode';
export const Bootstrap = memo(function Bootsrap(props) {
    const { data, onDataChange, ref, validationMode, uiSchema, schema, onSubmit, draft, ...rest } = props;
    const [initialData] = useState(props.data);
    return (_jsx(FormDataProvider, { value: data, onChange: onDataChange, children: _jsx(StoreContextProvider, { uiSchema: uiSchema, schema: schema, onSubmit: onSubmit, validationMode: validationMode ?? 'onBlur', initialData: initialData, ref: ref, draft: draft, children: _jsx(LayoutNode, { ...rest, id: "root" }) }) }));
});
