import { cast } from '@binaryoperations/json-forms-core/internals/cast';

import { createControl } from './core/hoc/createRenderer';
globalThis.createControl = cast<typeof globalThis.createControl>(createControl);

export * from './components/Controls/Input';
export { Bootstrap } from './core/components/Form';
