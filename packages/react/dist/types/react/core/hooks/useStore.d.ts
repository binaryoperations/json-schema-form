export declare const useStore: <SelectorOutput>(selector: (store: {
    uiContext: import("../../../core/schema/ui.schema").UiStore;
}) => SelectorOutput, equalityCheck?: (prev: any, next: any) => boolean) => [value: SelectorOutput, set: (value: (prev: {
    uiContext: import("../../../core/schema/ui.schema").UiStore;
}) => Partial<{
    uiContext: import("../../../core/schema/ui.schema").UiStore;
}>) => void];
//# sourceMappingURL=useStore.d.ts.map