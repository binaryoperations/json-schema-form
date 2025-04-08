import { ActiveStateType } from './types';
export declare const ActiveStateProvider: import("react").NamedExoticComponent<import("../../core/fast-context").ProviderProps<ActiveStateType>> & {
    displayName: string | undefined;
};
export declare const useActiveStateValue: <SelectorOutput>(selector: (store: ActiveStateType) => SelectorOutput, equalityCheck?: (prev: any, next: any) => boolean) => [value: SelectorOutput, set: (value: (prev: ActiveStateType) => Partial<ActiveStateType>) => void];
export declare function useActiveStateChange<T>(): (id: T) => void;
export declare function useIsActive<T>(id: T): [value: boolean, set: (value: (prev: ActiveStateType) => Partial<ActiveStateType>) => void];
export declare function useActiveState<T>(id: T): readonly [boolean, () => void];
//# sourceMappingURL=ActiveStateContext.d.ts.map