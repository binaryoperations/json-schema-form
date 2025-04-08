import React from 'react';
interface FormArrayProps {
    value: {
        id: string;
    }[];
    onChange: (newRecords: {
        id: string;
    }[]) => void;
    render: (params: {
        index: number;
        id: string;
        onRemove: (id: string) => void;
        onAdd: () => void;
    }) => React.ReactNode;
}
declare const FormArray: React.FC<FormArrayProps>;
export default FormArray;
//# sourceMappingURL=index.d.ts.map