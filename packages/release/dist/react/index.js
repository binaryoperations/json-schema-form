import { UiNodeType } from '../core/models';
import './core/components/CustomLayoutRenderer';
import { ControlRepository, LayoutRepository } from './core/context/RendererContext';
import { Form } from "./components/Semantic/Form";
import { CustomLayoutRenderer } from './core/components/CustomLayoutRenderer';
import { createLayoutRenderer } from './core/hoc/createRenderer';
export { createControl } from './core/hoc/createControl';
export * from './core/hoc/createControl';
export * from './components/Controls/Input';
export { Bootstrap } from './core/components/Form';
/** This serves as the root of the component tree */
LayoutRepository.register('form', createLayoutRenderer(Form));
LayoutRepository.register(UiNodeType.CUSTOM, CustomLayoutRenderer);
const defaultLayoutGetters = {
    [UiNodeType.ROWS]: () => import('./components/Semantic/Row').then((module) => module.Row),
    [UiNodeType.COLUMNS]: () => import('./components/Semantic/Column').then((module) => module.Column),
};
export const registerLayoutsRenderers = (arg = {}) => {
    const defaultLayouts = Object.fromEntries(Object.entries(defaultLayoutGetters).map(([key]) => [key, undefined]));
    async function registerLayout(name, layout, loadRenderer) {
        layout = layout ?? await loadRenderer?.();
        if (!layout)
            return;
        if (LayoutRepository.get(name) === layout)
            return;
        const renderer = createLayoutRenderer(layout);
        LayoutRepository.register(name, renderer);
    }
    Object.entries({ ...defaultLayouts, ...LayoutRepository.getAll(), ...arg }).forEach(([name, layout]) => {
        registerLayout(name, layout, defaultLayoutGetters[name]);
    });
};
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
    async function registerControl(name, renderer, loadRenderer) {
        renderer = renderer ?? await loadRenderer?.();
        if (!renderer)
            return;
        if (ControlRepository.get(name) === renderer)
            return;
        ControlRepository.register(name, renderer);
    }
    Object.entries({ ...defaultControls, ...ControlRepository.getAll(), ...arg }).forEach(([name, control]) => {
        registerControl(name, control, defaultControlGetters[name]);
    });
};
