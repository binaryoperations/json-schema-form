import { useUiStoreRef } from '../context/StoreContext';
export const useFormProps = function Form(props) {
    const storeRef = useUiStoreRef();
    return {
        ...props,
        onSubmit: storeRef.current.onSubmit,
    };
};
export const useSubmitButtonProps = function useSubmitButtonProps() {
    const storeRef = useUiStoreRef();
    return {
        type: 'submit',
        // disabled: storeRef.current.isSubmitting,
        onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            storeRef.current.onSubmit(e);
        },
    };
};
