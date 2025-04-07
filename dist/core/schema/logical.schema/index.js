// import { UiSchemaGenerator } from './Generator';
import { LogicalSchema } from './Parser';
export default {
    parse: LogicalSchema.prepare.bind(LogicalSchema),
    // generate: UiSchemaGenerator.generate.bind(UiSchemaGenerator),
};
