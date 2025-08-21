import type { LayoutSchema } from '../../models/LayoutSchema';
import { LogicalSchema } from '../logical.schema/Parser';
import { UiStore } from './UiStore';
export declare class UiSchemaPreparer {
    private counter;
    store: UiStore;
    constructor(draftSchema: LogicalSchema);
    private traverse;
    static prepare(uiSchema: LayoutSchema, draftSchema: LogicalSchema): UiStore;
}
//# sourceMappingURL=Preparer.d.ts.map