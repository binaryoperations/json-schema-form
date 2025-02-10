import { ChangeEvent, SyntheticEvent } from "react";
export interface BaseControlProps<Value = unknown> extends Record<string, unknown> {
    label?: string;
    value: Value;
    onChange: (nextValue: Value, originalEvent: SyntheticEvent<ChangeEvent>) => void;
}
//# sourceMappingURL=control.d.ts.map