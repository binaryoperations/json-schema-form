import { jsx as _jsx } from "react/jsx-runtime";
import { useUiStoreRef } from '../../core/context/StoreContext';
export const Form = function Form(props) {
    const storeRef = useUiStoreRef();
    return _jsx("form", { ...props, onSubmit: storeRef.current.onSubmit });
};
