import type { JsonError } from 'json-schema-library';
export declare function useControlState(initialData: object): {
    setTouched: (path: string) => void;
    setDirty: (path: string, value: unknown) => void;
    setErrors: (path: string, errors: JsonError[], reset?: boolean) => void;
    resetErrors: () => void;
    touchedControlPaths: Map<string, true>;
    dirtyControlPaths: Map<string, true>;
    errors: Map<string, JsonError[]>;
};
//# sourceMappingURL=useControlState.d.ts.map