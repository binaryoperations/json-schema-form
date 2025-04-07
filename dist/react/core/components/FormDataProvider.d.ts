import { RefObject } from 'react';
import { type FormDataProviderProps as FormProviderProps } from '../context/FormDataContext';
import { type ValidateData } from '../context/StoreContext';
type FormDataRef = {
    validate: ValidateData;
    resetErrors: () => void;
};
export type FormDataProviderProps = FormProviderProps & {
    ref?: RefObject<FormDataRef | null>;
};
export declare const FormDataProvider: (props: FormDataProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FormDataProvider.d.ts.map