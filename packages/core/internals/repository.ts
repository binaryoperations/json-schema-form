import debounce from 'lodash/debounce';

interface RepositoryConstructor<
  T extends Record<string, any>,
  Keys extends keyof T = keyof T,
> {
  onRegister?: (arg: T[Keys]) => T[Keys];
  name?: string;
}

export class Repository<
  T extends Record<string, any>,
  Keys extends keyof T = keyof T,
> extends EventTarget {
  private registry = {} as T;
  readonly #name!: string;

  readonly #onRegister!: (arg: T[Keys]) => T[Keys];

  get name() {
    return this.#name;
  }

  static generateUniqueId = () => {
    return btoa(Math.random() + "" )
      .substring(10, 15);
  };


  static create<T extends any, K extends string>(onRegister: (arg: T) => T) {
    return new Repository<Record<K, T>>({onRegister});
  }

  constructor(config: RepositoryConstructor<T, Keys> = {}) {
    const { onRegister = (arg: T[Keys]) => arg, name } = config;

    super();
    this.#onRegister = onRegister;
    this.#name = name || Repository.generateUniqueId();
  }

  private prepareName(eventName: string) {
    return `${eventName}::${this.#name}`;
  }

  has = (moduleName: Keys): boolean => {
    return !!this.registry[moduleName];
  };

  emit(event: string, ...values: any[]) {
    return super.dispatchEvent(
      new CustomEvent(this.prepareName(event), { detail: values })
    );
  }

  on(
    event: string,
    listener: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions | boolean
  ) {
    return this.addEventListener(this.prepareName(event), listener, options);
  }

  off(event: string, listener: EventListenerOrEventListenerObject) {
    return super.removeEventListener(this.prepareName(event), listener);
  }

  /**
   * Register a module with the src.
   */
  register = <V extends T[Keys], Key extends string>(moduleName: Key, module: V) => {
    this.registry = {
      ...this.registry,
      [moduleName]: this.#onRegister?.(module as T[Keys]) ?? module,
    };

    this.emit('module_registered', moduleName);

    return this as unknown as Repository<Record<Key, V> & T>;
  };

  /**
   * Get all registered module from the registry.
   */
  getAll = () => {
    return this.registry;
  };

  get(key: Keys) {
    return this.registry[key];
  }

  /**
   * Register a listener to the module registry.
   * Return value returns a function that removes the listener.
   */
  listen = (callback: () => void, signal?: AbortSignal) => {
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
    this.registry = {} as T;
    this.emit('modules_reset');
  }
}
