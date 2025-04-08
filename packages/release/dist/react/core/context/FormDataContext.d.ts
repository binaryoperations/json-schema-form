import { ComponentProps } from 'react';
import { CreateFastContext } from '../fast-context';
export type FormDataProviderProps = ComponentProps<ReturnType<CreateFastContext<object>>['Provider']>;
export declare const FormDataProvider: import("react").NamedExoticComponent<import("../fast-context").ProviderProps<object>> & {
    displayName: string | undefined;
};
export declare const useSetFormData: () => (value: (prev: object) => object) => void;
export declare const useFormDataRef: () => import("react").RefObject<object>;
export declare const useFormDataContext: <SelectorOutput>(selector: (store: object) => SelectorOutput, equalityCheck?: (prev: any, next: any) => boolean) => [value: SelectorOutput, set: (value: (prev: object) => object) => void];
//# sourceMappingURL=FormDataContext.d.ts.map