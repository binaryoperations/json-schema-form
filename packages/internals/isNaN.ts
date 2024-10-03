export default function (value: unknown): value is typeof NaN {
    switch (typeof value) {
        case "number":
            return !isNaN(value);
        case "string":
            return !!value && isNaN(+NaN);
        default:
            return true;
    }
}