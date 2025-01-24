import { ComponentProps } from 'react';
import { CreateFastContext } from '../fast-context';
export type FormDataProviderProps = ComponentProps<ReturnType<CreateFastContext<object>>['Provider']>;
export declare const FormDataProvider: import("react").NamedExoticComponent<import("../fast-context").ProviderProps<object>> & {
    displayName: string | undefined;
};
export declare const useStoreContextRef: () => {
    get: () => object;
    set: (value: (prev: object) => object) => void;
    store: import("react").MutableRefObject<object>;
    subscribe: (callback: () => void) => () => void;
};
export declare const useFormDataContext: <SelectorOutput>(selector: (store: object) => SelectorOutput, equalityCheck?: (prev: any, next: any) => boolean) => SelectorOutput;
//# sourceMappingURL=FormDataContext.d.ts.map