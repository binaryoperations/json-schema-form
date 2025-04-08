import debounce from 'lodash/debounce';
export class Repository extends EventTarget {
    registry = {};
    #name;
    #onRegister;
    get name() {
        return this.#name;
    }
    static generateUniqueId = () => {
        return btoa(Math.random() + "")
            .substring(10, 15);
    };
    static create(onRegister) {
        return new Repository({ onRegister });
    }
    constructor(config = {}) {
        const { onRegister = (arg) => arg, name } = config;
        super();
        this.#onRegister = onRegister;
        this.#name = name || Repository.generateUniqueId();
    }
    prepareName(eventName) {
        return `${eventName}::${this.#name}`;
    }
    has = (moduleName) => {
        return !!this.registry[moduleName];
    };
    emit(event, ...values) {
        return super.dispatchEvent(new CustomEvent(this.prepareName(event), { detail: values }));
    }
    on(event, listener, options) {
        return this.addEventListener(this.prepareName(event), listener, options);
    }
    off(event, listener) {
        return super.removeEventListener(this.prepareName(event), listener);
    }
    /**
     * Register a module with the src.
     */
    register = (moduleName, module) => {
        this.registry = {
            ...this.registry,
            [moduleName]: this.#onRegister?.(module) ?? module,
        };
        this.emit('module_registered', moduleName);
        return this;
    };
    /**
     * Get all registered module from the registry.
     */
    getAll = () => {
        return this.registry;
    };
    get(key) {
        return this.registry[key];
    }
    /**
     * Register a listener to the module registry.
     * Return value returns a function that removes the listener.
     */
    listen = (callback, signal) => {
        const debouncedCallback = debounce(callback, 100, {
            trailing: true,
            leading: false,
        });
        const ac = new AbortController();
        const mergedSignal = signal ? AbortSignal.any([signal, ac.signal]) : signal;
        this.on('module_registered', debouncedCallback, {
            signal: mergedSignal,
        });
        this.on('modules_reset', debouncedCallback, {
            signal: mergedSignal,
        });
        return () => {
            ac.abort();
        };
    };
    reset() {
        this.registry = {};
        this.emit('modules_reset');
    }
}
