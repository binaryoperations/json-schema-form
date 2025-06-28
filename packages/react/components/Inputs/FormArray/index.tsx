import { generateId } from '@binaryoperations/json-forms-core/internals/generateId';
import React, { Fragment } from 'react';

interface FormArrayProps {
  value: { id: string }[];
  onChange: (newRecords: { id: string }[]) => void;
  render: (params: {
    index: number;
    id: string;
    onRemove: (id: string) => void;
    onAdd: () => void;
  }) => React.ReactNode;
}

const FormArray: React.FC<FormArrayProps> = ({ value, onChange, render }) => {
  const onAdd = () => {
    const newRecord = { id: generateId('form-array-record') };
    onChange([...value, newRecord]);
  };

  const onRemove = (id: string) => {
    onChange(value.filter((record) => record.id !== id));
  };

  return (
    <>
      {value.map((record, index) => (
        <Fragment key={record.id}>
          {render({
            id: record.id,
            index,
            onRemove,
            onAdd,
          })}
        </Fragment>
      ))}
    </>
  );
};

export default FormArray;
