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
//# sourceMappingURL=FormDataProvider.js.map