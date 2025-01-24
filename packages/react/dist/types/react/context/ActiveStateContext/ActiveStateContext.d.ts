/// <reference types="react" />
import { ActiveStateType } from './types';
export declare const ActiveStateProvider: import("react").NamedExoticComponent<import("../../core/fast-context").ProviderProps<ActiveStateType>> & {
    displayName: string | undefined;
};
export declare const useActiveStateValue: <SelectorOutput>(selector: (store: ActiveStateType) => SelectorOutput, equalityCheck?: (prev: any, next: any) => boolean) => SelectorOutput;
export declare function useActiveStateChange<T>(): (id: T) => void;
export declare function useIsActive<T>(id: T): boolean;
export declare function useActiveState<T>(id: T): readonly [boolean, () => void];
//# sourceMappingURL=ActiveStateContext.d.ts.map