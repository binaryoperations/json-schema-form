import { RendererRepository, ControlRepository } from './core/context/RendererContext';
import { Form } from "./components/Semantic/Form";
import { createLayoutRenderer } from './core/hoc/createRenderer';
export { createControl } from './core/hoc/createControl';
export * from './core/hoc/createControl';
export * from './components/Controls/Input';
export { Bootstrap } from './core/components/Form';
/** This serves as the root of the component tree */
RendererRepository.register('form', createLayoutRenderer(Form));
const defaultLayoutGetters = {
    "rows": () => import('./components/Semantic/Row').then((module) => module.Row),
    "columns": () => import('./components/Semantic/Column').then((module) => module.Column),
};
export const registerRenderers = (arg = {}) => {
    const defaultLayouts = Object.fromEntries(Object.entries(defaultLayoutGetters).map(([key]) => [key, undefined]));
    async function registerLayout(name, layout, loadRenderer) {
        layout = layout ?? await loadRenderer?.();
        if (!layout)
            return;
        if ("Control" in layout) {
            registerControl(name, layout);
            return;
        }
        if (RendererRepository.get(name) === layout)
            return;
        const renderer = createLayoutRenderer(layout);
        RendererRepository.register(name, renderer);
    }
    Object.entries({ ...defaultLayouts, ...RendererRepository.getAll(), ...arg }).forEach(([name, layout]) => {
        registerLayout(name, layout, defaultLayoutGetters[name]);
    });
};
async function registerControl(name, renderer, loadRenderer) {
    renderer = renderer ?? await loadRenderer?.();
    if (!renderer)
        return;
    if (ControlRepository.get(name) === renderer)
        return;
    ControlRepository.register(name, renderer);
}
export const regiserControlRenderers = (arg = {}) => {
    const defaultControlGetters = {
        'number': () => {
            return import('./components/Controls/Number').then((module) => module.NumberControl);
        },
        'string': () => {
            return import('./components/Controls/TextInput').then((module) => module.TextInputControl);
        },
    };
    const defaultControls = Object.fromEntries(Object.entries(defaultControlGetters).map(([key]) => [key, undefined]));
    Object.entries({ ...defaultControls, ...ControlRepository.getAll(), ...arg }).forEach(([name, control]) => {
        registerControl(name, control, defaultControlGetters[name]);
    });
};
