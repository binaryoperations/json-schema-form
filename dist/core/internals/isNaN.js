export default function NaNCheck(value) {
    switch (typeof value) {
        case 'number':
            return !isNaN(value);
        case 'string':
            return !!value && isNaN(+NaN);
        default:
            return true;
    }
}
