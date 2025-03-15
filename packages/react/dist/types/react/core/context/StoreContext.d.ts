/// <reference types="react" />
import type { UiStore } from '../../../core/schema/ui.schema';
export declare const UiStoreContextProvider: import("react").NamedExoticComponent<import("../fast-context").ProviderProps<{
    uiContext: UiStore;
}>> & {
    displayName: string | undefined;
};
export declare const useUiStoreContext: <SelectorOutput>(selector: (store: {
    uiContext: UiStore;
}) => SelectorOutput, equalityCheck?: (prev: any, next: any) => boolean) => [value: SelectorOutput, set: (value: (prev: {
    uiContext: UiStore;
}) => Partial<{
    uiContext: UiStore;
}>) => void];
//# sourceMappingURL=StoreContext.d.ts.map