import { Draft, Draft2019, isJsonError, resolveOneOfFuzzy, } from 'json-schema-library';
export class LogicalSchema {
    draft;
    static prepare(schema, DraftConstructor) {
        const ClassConstructor = Object.assign(this);
        return new ClassConstructor(schema, DraftConstructor);
    }
    constructor(schema, DraftConstructor = Draft2019) {
        this.draft =
            schema instanceof Draft
                ? schema
                : new DraftConstructor(schema, { resolveOneOf: resolveOneOfFuzzy });
    }
    prepareTemplate(defaultValues) {
        return this.draft.getTemplate(defaultValues, undefined, {
            addOptionalProps: true,
        });
    }
    validate(value, schema = this.draft) {
        schema = schema instanceof Draft ? schema.getSchema() : schema;
        const errors = this.draft.validate(value, schema);
        return {
            isValid: !errors.length,
            errors,
        };
    }
    getSchemaOf(pointer, data = {}) {
        const schemaNode = this.draft.getSchema({ pointer, data });
        if (!schemaNode)
            throw new Error(`Schema not found for pointer: ${pointer}`);
        if (isJsonError(schemaNode))
            throw new Error(schemaNode.name, { cause: schemaNode });
        return schemaNode;
    }
    getSchemaNodeOf(pointer, data = {}) {
        const schemaNode = this.draft.getSchemaNode({ pointer, data });
        if (!schemaNode)
            throw new Error(`Schema not found for pointer: ${pointer}`);
        if (isJsonError(schemaNode))
            throw new Error(schemaNode.name, { cause: schemaNode });
        return schemaNode;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vY29yZS9zY2hlbWEvbG9naWNhbC5zY2hlbWEvUGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxLQUFLLEVBQ0wsU0FBUyxFQUVULFdBQVcsRUFHWCxpQkFBaUIsR0FFbEIsTUFBTSxxQkFBcUIsQ0FBQztBQVE3QixNQUFNLE9BQU8sYUFBYTtJQUNoQixLQUFLLENBQVE7SUFFckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFrQixFQUFFLGdCQUFtQztRQUNwRSxNQUFNLGdCQUFnQixHQUF5QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25FLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsWUFDRSxNQUEwQixFQUMxQixtQkFBcUMsU0FBUztRQUU5QyxJQUFJLENBQUMsS0FBSztZQUNSLE1BQU0sWUFBWSxLQUFLO2dCQUNyQixDQUFDLENBQUMsTUFBTTtnQkFDUixDQUFDLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxlQUFlLENBQWdDLGFBQWlCO1FBQzlELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRTtZQUN0RCxnQkFBZ0IsRUFBRSxJQUFJO1NBQ3ZCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBVSxFQUFFLFNBQTZCLElBQUksQ0FBQyxLQUFLO1FBQzFELE1BQU0sR0FBRyxNQUFNLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUVoRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFbEQsT0FBTztZQUNMLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQ3ZCLE1BQU07U0FDUCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFlLEVBQUUsT0FBNEIsRUFBRTtRQUN6RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxVQUFVO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUU5RCxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUM7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFFMUQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFlLEVBQUUsT0FBNEIsRUFBRTtRQUM3RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxVQUFVO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUM5RCxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUM7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFFMUQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGIn0=