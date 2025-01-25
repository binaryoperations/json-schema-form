import { cast } from '../core/internals/cast';
import { createControl } from './core/hoc/createRenderer';
globalThis.createControl = cast(createControl);
export * from './components/Controls/Input';
export { Bootstrap } from './core/components/Form';
//# sourceMappingURL=index.js.map