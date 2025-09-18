let store = null;
export const getNode = (pointer) => {
    return store?.[pointer || ""] ?? null;
};
export const setNodes = (nextStore) => {
    store = nextStore;
};
