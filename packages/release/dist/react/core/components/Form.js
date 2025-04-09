import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useState } from 'react';
import { FormDataProvider, } from './FormDataProvider';
import { StoreContextProvider, } from './StoreContextProvider';
import { useLayoutNode } from '../hooks/useRenderer';
export const Bootstrap = memo(function Bootsrap(props) {
    const { data, onDataChange, ref, validationMode, uiSchema, schema, ...rest } = props;
    const [initialData] = useState(props.data);
    const FormRenderer = useLayoutNode('form');
    return (_jsx(StoreContextProvider, { uiSchema: uiSchema, schema: schema, validationMode: validationMode ?? 'onBlur', initialData: initialData, children: _jsx(FormDataProvider, { value: data, onChange: onDataChange, ref: ref, children: _jsx(FormRenderer, { ...rest, id: "root" }) }) }));
});
