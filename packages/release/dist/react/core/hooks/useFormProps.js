import { useUiStoreRef, useUiStoreContext } from '../context/StoreContext';
export const useFormProps = function Form(props) {
    const storeRef = useUiStoreRef();
    return {
        ...props,
        onSubmit: storeRef.current.onSubmit,
    };
};
export const useSubmitButtonProps = function useSubmitButtonProps() {
    const [onClick] = useUiStoreContext((store) => store.onSubmit);
    return {
        type: 'submit',
        // disabled: storeRef.current.isSubmitting,
        onClick,
    };
};
