import { cast } from '@binaryoperations/json-forms-core/internals/cast';

import { type CreateControl, createControl } from './core/hoc/createRenderer';
globalThis.createControl = cast<CreateControl>(createControl);

export * from './components/Controls/Input';
export { Bootstrap } from './core/components/Form';
