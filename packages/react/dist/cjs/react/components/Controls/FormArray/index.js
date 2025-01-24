import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { generateId } from '../../../../internals/generateId';
import { Fragment } from 'react';
const FormArray = ({ value, onChange, render }) => {
    const onAdd = () => {
        const newRecord = { id: generateId('form-array-record') };
        onChange([...value, newRecord]);
    };
    const onRemove = (id) => {
        onChange(value.filter((record) => record.id !== id));
    };
    return (_jsx(_Fragment, { children: value.map((record, index) => (_jsx(Fragment, { children: render({
                id: record.id,
                index,
                onRemove,
                onAdd,
            }) }, record.id))) }));
};
export default FormArray;
//# sourceMappingURL=index.js.map