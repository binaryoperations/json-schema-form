import { cast } from '@binaryoperations/json-forms-internals/cast';

import { createControl } from './core/hoc/createRenderer';
globalThis.createControl = cast<typeof globalThis.createControl>(createControl);
