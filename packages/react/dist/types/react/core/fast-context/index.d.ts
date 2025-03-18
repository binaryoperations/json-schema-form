import { type ComponentType, type Context, PropsWithChildren, type RefObject } from 'react';
type StoreDataType = NonNullable<object>;
type Selector<IStore, SelectorOutput> = (store: IStore) => SelectorOutput;
type EqualityCheck = (prev: any, next: any) => boolean;
type UseStoreDataReturnType<IStore extends StoreDataType = StoreDataType> = {
    get: () => IStore;
    set: (value: (prev: IStore) => Partial<IStore>) => void;
    store: RefObject<IStore>;
    subscribe: (callback: () => void) => () => void;
};
export type ProviderProps<T> = PropsWithChildren<{
    value: T;
    onChange?: (nextValue: T) => void;
}>;
type CreateFastContextConfig = boolean | {
    watch?: boolean;
};
export type CreateFastContext<T extends StoreDataType = StoreDataType> = (name: string, config?: CreateFastContextConfig) => {
    useStoreRef: () => RefObject<T>;
    Provider: ComponentType<ProviderProps<T>>;
    useContext: <SelectorResult>(selector: Selector<T, SelectorResult>, equalityCheck: EqualityCheck) => [
        selectedResult: SelectorResult,
        setValue: UseStoreDataReturnType<T>['set']
    ];
    useContextValue: <SelectorResult>(selector: Selector<T, SelectorResult>, equalityCheck: EqualityCheck) => [SelectorResult, UseStoreDataReturnType<T>['set']];
    useSetStore: () => UseStoreDataReturnType<T>['set'];
};
export declare const createFastContext: <T extends object = object>(debugName?: string, config?: CreateFastContextConfig) => {
    /**
     * using the value from here will never cause a rerender as context is based on refs.
     */
    useStoreRef: () => RefObject<T>;
    /**
     *
     * the value is memoized and thus changing the value will have no effect.
     * use key prop to unmount and remount if necessary. alternatively use set from the context to update the value.
     *
     */
    Provider: import("react").NamedExoticComponent<ProviderProps<T>> & {
        displayName: string | undefined;
    };
    /**
     *
     * @param selector
     * @param equalityCheck
     * @returns tuple, first item is return value of the selector and the second item is setter
     *
     */
    useContext: <SelectorOutput>(selector: Selector<T, SelectorOutput>, equalityCheck?: EqualityCheck) => [value: SelectorOutput, set: (value: (prev: T) => Partial<T>) => void];
    /**
     *
     * @param selector
     * @param equalityCheck
     * @returns return value of the selector
     *
     */
    useContextValue: <SelectorOutput_1>(selector: Selector<T, SelectorOutput_1>, equalityCheck?: EqualityCheck) => [value: SelectorOutput_1, set: (value: (prev: T) => Partial<T>) => void];
    /** Returns the setter method */
    useSetStore: () => (value: (prev: T) => Partial<T>) => void;
    /**
     * context of the store. Useful for ContextBridge
     */
    Context: Context<UseStoreDataReturnType<T> | null>;
};
export declare const createProvider: <T extends object = object>(StoreContext: Context<UseStoreDataReturnType<T>>, watch: boolean) => import("react").NamedExoticComponent<ProviderProps<T>> & {
    displayName: string | undefined;
};
export declare const createUseRefContext: <T extends object = object>(_Context: Context<UseStoreDataReturnType<T> | null>) => () => UseStoreDataReturnType<T>;
export declare const useFastContextStore: <IStore extends object, SelectorOutput>(_Context: Context<UseStoreDataReturnType<IStore> | null>, selector: Selector<IStore, SelectorOutput>, equalityFn?: (value1: any, value2: any) => boolean) => [value: SelectorOutput, set: (value: (prev: IStore) => Partial<IStore>) => void];
export declare const useStoreValue: <IStore extends object, SelectorOutput>(_Context: Context<UseStoreDataReturnType<IStore> | null>, selector: Selector<IStore, SelectorOutput>, equalityFn?: (value1: any, value2: any) => boolean) => [value: SelectorOutput, set: (value: (prev: IStore) => Partial<IStore>) => void];
export {};
//# sourceMappingURL=index.d.ts.map