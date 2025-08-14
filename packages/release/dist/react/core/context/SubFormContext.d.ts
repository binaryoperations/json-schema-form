import { FormEventHandler } from "react";
type SubFormContext = {
    id?: string;
    onSubmit?: FormEventHandler;
};
export declare const SubFormContext: import("react").Context<SubFormContext | null>;
export declare const useSubformContext: () => SubFormContext | null;
export {};
//# sourceMappingURL=SubFormContext.d.ts.map