import { jsx as _jsx } from "react/jsx-runtime";
import { useImperativeHandle } from 'react';
import { FormDataProvider as FormProvider, } from '../context/FormDataContext';
import { useUiStoreRef } from '../context/StoreContext';
export const FormDataProvider = (props) => {
    const { ref, ...rest } = props;
    const { validate, resetErrors } = useUiStoreRef().current;
    useImperativeHandle(ref, () => ({ validate, resetErrors }), [
        validate,
        resetErrors,
    ]);
    return _jsx(FormProvider, { ...rest });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybURhdGFQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvcmUvY29tcG9uZW50cy9Gb3JtRGF0YVByb3ZpZGVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFhLG1CQUFtQixFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRXZELE9BQU8sRUFDTCxnQkFBZ0IsSUFBSSxZQUFZLEdBRWpDLE1BQU0sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxFQUFFLGFBQWEsRUFBcUIsTUFBTSx5QkFBeUIsQ0FBQztBQVczRSxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEtBQTRCLEVBQUUsRUFBRTtJQUMvRCxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBRS9CLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEdBQUcsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDO0lBRTFELG1CQUFtQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUU7UUFDMUQsUUFBUTtRQUNSLFdBQVc7S0FDWixDQUFDLENBQUM7SUFFSCxPQUFPLEtBQUMsWUFBWSxPQUFLLElBQUksR0FBSSxDQUFDO0FBQ3BDLENBQUMsQ0FBQyJ9