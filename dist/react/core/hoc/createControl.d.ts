import { ControlCreator } from '@binaryoperations/json-forms-core/controls/createControl';
import { BaseControlProps } from '@binaryoperations/json-forms-core/types/control';
import type { ComponentType, SyntheticEvent } from 'react';
export type RankedControl = ReturnType<typeof createControl.create>;
export declare const createControl: ControlCreator<ComponentType<BaseControlProps<any, any, SyntheticEvent<Element, Event>>>>;
//# sourceMappingURL=createControl.d.ts.map