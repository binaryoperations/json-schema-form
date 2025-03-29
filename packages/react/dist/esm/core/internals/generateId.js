let i = 0;
export const generateId = (prefix = 'id') => {
    i += 1;
    return `${prefix}-${i}`;
};
//# sourceMappingURL=generateId.js.map