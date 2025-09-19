import type { LayoutSchema } from '../../models/LayoutSchema';
import { LogicalSchema } from '../logical.schema/Parser';
import { UiStore } from './UiStore';
export declare class UiSchemaPreparer {
    private formData?;
    private counter;
    store: UiStore;
    constructor(draftSchema: LogicalSchema, formData?: object | undefined);
    private traverse;
    static prepare(uiSchema: LayoutSchema, draftSchema: LogicalSchema, formData?: object): UiStore;
}
//# sourceMappingURL=Preparer.d.ts.map