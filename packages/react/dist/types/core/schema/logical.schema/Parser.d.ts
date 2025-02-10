import { Schema } from '../../models';
/**
 *
 * Normalise references into objects from definitions
 *
 * TODO:
 * 1. Nested definitions
 * 2. Circular references
 *
 */
export declare class JsonSchemaParser {
    private rootSchema;
    constructor(rootSchema: Schema);
    static parse(object: Schema): Schema;
    private explodeRef;
    private walkObject;
    private walkArray;
    walk(node: Schema): Schema;
}
//# sourceMappingURL=Parser.d.ts.map