export default function invariant(value, message) {
    if (value === null || value === undefined)
        throw new Error(message);
    return value;
}
