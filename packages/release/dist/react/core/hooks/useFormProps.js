import { fastDeepEqual } from '../../../core/internals/object';
import { useCallback } from 'react';
import { useUiStoreContext, useUiStoreRef } from '../context/StoreContext';
export const useFormProps = function Form(props) {
    const storeRef = useUiStoreRef();
    return {
        ...props,
        onSubmit: storeRef.current.onSubmit,
    };
};
export const useSubFormProps = function SubForm(props) {
    const storeRef = useUiStoreRef();
    const [schemaNode] = useUiStoreContext((store) => {
        return store.uiContext.deriveSchemaNodeAtPointer(props.id);
    }, fastDeepEqual);
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        return storeRef.current.submit(schemaNode);
    }, [schemaNode, storeRef]);
    return {
        ...props,
        onSubmit: handleSubmit,
    };
};
