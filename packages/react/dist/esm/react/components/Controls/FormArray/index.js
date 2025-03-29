import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { generateId } from '../../../../core/internals/generateId';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9jb21wb25lbnRzL0NvbnRyb2xzL0Zvcm1BcnJheS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUNwRixPQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBYXhDLE1BQU0sU0FBUyxHQUE2QixDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO0lBQzFFLE1BQU0sS0FBSyxHQUFHLEdBQUcsRUFBRTtRQUNqQixNQUFNLFNBQVMsR0FBRyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDO1FBQzFELFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFVLEVBQUUsRUFBRTtRQUM5QixRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQztJQUVGLE9BQU8sQ0FDTCw0QkFDRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FDNUIsS0FBQyxRQUFRLGNBQ04sTUFBTSxDQUFDO2dCQUNOLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDYixLQUFLO2dCQUNMLFFBQVE7Z0JBQ1IsS0FBSzthQUNOLENBQUMsSUFOVyxNQUFNLENBQUMsRUFBRSxDQU9iLENBQ1osQ0FBQyxHQUNELENBQ0osQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLGVBQWUsU0FBUyxDQUFDIn0=