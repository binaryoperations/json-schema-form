import { ComponentType, SyntheticEvent } from "react";
import { createFastContext } from "./fast-context";

export type FormContextType<Schema = {}> = {
    value: unknown;
    onChange: (e: SyntheticEvent<ComponentType, Schema>) => void;
};

export const {
    Context: FormContext,
    Provider: FormContextProvider,
    useContextValue: useFormValue,
} = createFastContext<FormContextType>();
