import { ComponentType, SyntheticEvent } from "react";
import { createFastContext } from "./fast-context";

export type FormContextType<Schema = object> = {
    value: Schema;
    errors: Map<string, string>;
    onSubmit: (e: SyntheticEvent<null, Schema>) => void;
    onChange: (e: SyntheticEvent<ComponentType, Schema>) => void;
};

export const {
    Context: FormContext,
    Provider: FormContextProvider,
    useContextValue: useFormValue,
} = createFastContext<FormContextType>();
