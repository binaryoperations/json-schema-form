interface RepositoryConstructor<T extends Record<string, any>, Keys extends keyof T = keyof T> {
    onRegister?: (arg: T[Keys]) => T[Keys];
    name?: string;
}
export declare class Repository<T extends Record<string, any>, Keys extends keyof T = keyof T> extends EventTarget {
    #private;
    private registry;
    get name(): string;
    static generateUniqueId: () => string;
    static create<T extends any, K extends string>(onRegister: (arg: T) => T): Repository<Record<K, T>, K>;
    constructor(config?: RepositoryConstructor<T, Keys>);
    private prepareName;
    has: (moduleName: Keys) => boolean;
    emit(event: string, ...values: any[]): boolean;
    on(event: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions | boolean): void;
    off(event: string, listener: EventListenerOrEventListenerObject): void;
    /**
     * Register a module with the src.
     */
    register: <V extends T[Keys], Key extends string>(moduleName: Key, module: V) => Repository<Record<Key, V> & T>;
    /**
     * Get all registered module from the registry.
     */
    getAll: () => T;
    get(key: Keys): T[Keys];
    /**
     * Register a listener to the module registry.
     * Return value returns a function that removes the listener.
     */
    listen: (callback: () => void, signal?: AbortSignal) => () => void;
    reset(): void;
}
export {};
//# sourceMappingURL=repository.d.ts.map