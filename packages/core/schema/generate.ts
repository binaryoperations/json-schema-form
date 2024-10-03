import type {
    ArrayJsonSchema,
    BaseKeys,
    BooleanJsonSchema,
    JsonSchema,
    NullJsonSchema,
    NumberJsonSchema,
    ObjectJsonSchema,
    StringJsonSchema,
} from "../models/JsonSchema";

import uniqBy from "lodash/uniqBy";
import isNaN from "../../../utils/isNaN";

type Properties = { [property: string]: JsonSchema };

export enum CONSTANTS {
    OBJECT,
    ARRAY,
    STRING,
    NUMBER,
    NULL,
}

type ExpectedResponse = {
    [CONSTANTS.OBJECT]: Partial<
        Omit<ObjectJsonSchema, BaseKeys | "properties">
    >;
    [CONSTANTS.ARRAY]: Partial<Omit<ArrayJsonSchema, BaseKeys | "items">>;
    [CONSTANTS.STRING]: Partial<Omit<StringJsonSchema, BaseKeys>>;
    [CONSTANTS.NUMBER]: Partial<Omit<StringJsonSchema, BaseKeys>>;
    [CONSTANTS.NULL]: Partial<Omit<StringJsonSchema, BaseKeys>>;
};

export class Generate<T extends JsonSchema = JsonSchema> {
    static StringSchema: typeof Generate<StringJsonSchema>;
    static NumberSchema: typeof Generate<NumberJsonSchema>;
    static BooleanSchema: typeof Generate<BooleanJsonSchema>;
    static NullSchema: typeof Generate<NullJsonSchema>;
    static ArraySchema: typeof Generate<ArrayJsonSchema>;
    static ObjectSchema: typeof Generate<ObjectJsonSchema>;

    constructor(
        protected deriveOptions: (
            value: any,
            path: (string| number)[]
        ) => <T extends CONSTANTS = CONSTANTS>(prop: T) => undefined | ExpectedResponse[T]
    ) {}

    protected get Constructor(): typeof Generate {
        return this.constructor as typeof Generate;
    }

    protected getTypedClass(type: string) {
        switch (type) {
            case "null":
                return this.Constructor.NullSchema;
            case "number":
                return this.Constructor.NumberSchema;
            case "boolean":
                return this.Constructor.BooleanSchema;
            case "object":
                return this.Constructor.ObjectSchema;
            case "array":
                return this.Constructor.ArraySchema;
            case "string":
                default:
                return this.Constructor.StringSchema;
                
        }
    }

    protected getTypedInstance(type: unknown) {
        const normalizedType = typeof type === "string" ? type : type === null ? "null" : Array.isArray(type) ? "array" : typeof type;
        // TODO: infer type correctly
        const Class = this.getTypedClass(normalizedType);
        return new Class(this.deriveOptions);
    }

    protected preparePath(tail: string | string[], head = "") {
        const $id = [head].concat(tail).filter(Boolean).filter(Boolean).join("/");
        return {
            $id,
            path: $id.replaceAll(/#|properties|items\/?/g, "").split("/").filter(Boolean).map((node) => isNaN(node) ? node : +node),
        };
    }

    protected parseProperties(object: object, head?: string) {
        return Object.entries(object).reduce(
            (properties: Properties | any, [key, value]) =>
                Object.defineProperty(properties, key, {
                    value: this.parseValue(value, key, head),
                }),
            {}
        );
    }

    protected parseArrayOrObject(
        value: object | any[],
        key: string,
        head?: string
    ) {
        if (Array.isArray(value)) {
            return this.getTypedInstance("array").prepareSchema(
                value,
                key,
                head
            );
        }

        return this.getTypedInstance("object").prepareSchema(value, key, head);
    }

    protected parseValue(value: any, key: string, head?: string): JsonSchema {
        if (value === null)
            return this.getTypedInstance("null").prepareSchema(value, "");

        switch (typeof value) {
            case "object":
                return this.parseArrayOrObject(value, key, head);
            default:
                return this.getTypedInstance(typeof value).prepareSchema(
                    value,
                    key,
                    head
                );
        }
    }

    prepareSchema(value: any, _key: string, _head?: string): T {
        throw new Error(
            `"${
                value === null ? "null" : typeof value
            }" prepareSchema method is not defined on this class`
        );
    }

    parse(object: unknown) {
        return this.getTypedInstance(object).prepareSchema(object, '', '#');
    }
}

class GenerateObjectSchema extends Generate<ObjectJsonSchema> {
    prepareSchema(value: object, key: string, head?: string): ObjectJsonSchema {
        const { $id, path } = this.preparePath([key, "properties"], head);
        const deriveOptions = this.deriveOptions(value, path);

        const objectSchema: ObjectJsonSchema = {
            $id,
            type: "object",
            properties: this.parseProperties(value, $id),
            ...deriveOptions(CONSTANTS.OBJECT),
        };

        return objectSchema;
    }
}

class GenerateArraySchema extends Generate<ArrayJsonSchema> {
    private parseArray(value: any[], head: string) {
        if (!value.length) return value;

        const childrenSchema = value.map((item, i) =>
            this.parseValue(item, `${i}`, head)
        );

        const distinctChildren = uniqBy(childrenSchema, "type");

        if (distinctChildren.length === 1) return distinctChildren;

        return {
            oneOf: distinctChildren,
        };
    }

    prepareSchema(value: any[], key: string, head?: string): ArrayJsonSchema {
        const { $id, path } = this.preparePath(["items", key], head);
        const items = this.parseArray(value, $id);

        const deriveOptions = this.deriveOptions(value, path);

        return {
            $id,
            type: "array",
            items: items,
            ...deriveOptions(CONSTANTS.ARRAY),
        };
    }
}

class GenerateStringSchema extends Generate<StringJsonSchema> {
    prepareSchema(value: string, key: string, head?: string): StringJsonSchema {
        const { $id, path } = this.preparePath(key, head);

        const deriveOptions = this.deriveOptions(value, path);

        return {
            $id,
            type: "string",
            ...deriveOptions(CONSTANTS.STRING),
        };
    }
}
class GenerateNumberSchema extends Generate<NumberJsonSchema> {
    prepareSchema(value: number, key: string, head?: string): NumberJsonSchema {
        const { $id, path } = this.preparePath(key, head);

        const deriveOptions = this.deriveOptions(value, path);

        return {
            $id,
            type: "number",
            ...deriveOptions(CONSTANTS.NUMBER),
        };
    }
}
class GenerateBooleanSchema extends Generate<BooleanJsonSchema> {
    prepareSchema(
        _value: boolean,
        key: string,
        head?: string
    ): BooleanJsonSchema {
        const { $id } = this.preparePath(key, head);

        return {
            $id,
            type: "boolean",
        };
    }
}
class GenerateNullSchema extends Generate<NullJsonSchema> {
    prepareSchema(value: any[], key: string, head?: string): NullJsonSchema {
        const { $id, path } = this.preparePath(key, head);
        const deriveOptions = this.deriveOptions(value, path);

        return {
            $id,
            type: "null",
            ...deriveOptions(CONSTANTS.NULL),
        };
    }
}

Generate.StringSchema = GenerateStringSchema;
Generate.NumberSchema = GenerateNumberSchema;
Generate.BooleanSchema = GenerateBooleanSchema;
Generate.ObjectSchema = GenerateObjectSchema;
Generate.ArraySchema = GenerateArraySchema;
Generate.NullSchema = GenerateNullSchema;
