import { UiSchemaGenerator } from './Generator';
import { UiSchemaPreparer } from './Preparer';
export default {
    prepare: UiSchemaPreparer.prepare.bind(UiSchemaPreparer),
    generate: UiSchemaGenerator.generate.bind(UiSchemaGenerator),
};
export { UiStore } from './UiStore';
//# sourceMappingURL=index.js.map