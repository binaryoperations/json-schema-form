import { Schema } from '../../models';
export declare class JsonSchemaParser {
    private rootSchema;
    constructor(rootSchema: Schema);
    static parse(object: Schema): Schema;
    private explodeRef;
    walk(node: Schema): Schema;
    private walkObject;
    private walkArray;
}
//# sourceMappingURL=Parser.d.ts.map