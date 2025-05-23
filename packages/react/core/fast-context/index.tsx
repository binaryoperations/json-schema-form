import { shallowCompare } from '@binaryoperations/json-forms-core/internals/object';
import {
  type ComponentType,
  type Context,
  createContext,
  memo,
  PropsWithChildren,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';

import { useInvariantContext } from '../hooks/useInvariantContext';
import useSafeCallback from '../hooks/useSafeCallback';
import useValue from '../hooks/useValue';

type StoreDataType = NonNullable<object>;

type Selector<IStore, SelectorOutput> = (store: IStore) => SelectorOutput;
type EqualityCheck = (prev: any, next: any) => boolean;

type UseStoreDataReturnType<IStore extends StoreDataType = StoreDataType> = {
  get: () => IStore;
  set: (value: (prev: IStore) => Partial<IStore>) => void;
  store: RefObject<IStore>;
  subscribe: (callback: () => void) => () => void;
};

const noop = () => {};

const useStoreData = <IStore extends StoreDataType = StoreDataType>(
  value: IStore,
  onChange?: (nextValue: IStore) => void,
  watch = false
): UseStoreDataReturnType<IStore> => {
  const store = useRef<IStore>(value as IStore);
  const watchRef = useRef(watch);
  const effectRef = useRef(false);
  const hasOnChange = useRef(!!onChange).current;
  const onChangeRef = useSafeCallback(onChange ?? noop);

  const get = useCallback(() => store.current, [store]);

  const subscribers = useRef(new Set<() => void>());

  const set = useCallback(
    (callback: (prev: IStore) => Partial<IStore>) => {
      store.current = { ...store.current, ...callback(store.current) };
      if (!effectRef.current && hasOnChange) onChangeRef(store.current);
      else subscribers.current.forEach((subscriber) => subscriber());
      effectRef.current = false;
    },
    [store, onChangeRef, hasOnChange]
  );

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  /**
   *
   * The effect is required to trigger the updates on the consumers
   */
  useEffect(() => {
    if (!watchRef.current) return;
    effectRef.current = true;
    set(() => value);
  }, [set, store, value]);

  /**
   *
   * Cases:
   * 1. when the value updates, we want the data to be updated immediately
   * 2. the data stored in store.current may not be current with regards to the parent and the parent must have dropped the references related to the data.
   * 3. because store.current is a ref, on watch and change, if we update store.current, no side-effect introduced.
   */
  if (useValue(value).previousValue !== value && watchRef.current) {
    store.current = { ...store.current, ...value };
  }

  return useMemo(
    () => ({
      get,
      set,
      subscribe,
      store,
    }),
    [get, set, subscribe]
  );
};

export type ProviderProps<T> = PropsWithChildren<{
  value: T;
  onChange?: (nextValue: T) => void;
}>;

type CreateFastContextConfig = boolean | { watch?: boolean };

export type CreateFastContext<T extends StoreDataType = StoreDataType> = (
  name: string,
  config?: CreateFastContextConfig
) => {
  useStoreRef: () => RefObject<T>;
  Provider: ComponentType<ProviderProps<T>>;
  useContext: <SelectorResult>(
    selector: Selector<T, SelectorResult>,
    equalityCheck: EqualityCheck
  ) => [
    selectedResult: SelectorResult,
    setValue: UseStoreDataReturnType<T>['set'],
  ];
  useContextValue: <SelectorResult>(
    selector: Selector<T, SelectorResult>,
    equalityCheck: EqualityCheck
  ) => [SelectorResult, UseStoreDataReturnType<T>['set']];

  useSetStore: () => UseStoreDataReturnType<T>['set'];
};

let counter = 0;
export const createFastContext = <T extends StoreDataType = StoreDataType>(
  debugName: string = `fast-context-${++counter}`,
  config?: CreateFastContextConfig
) => {
  const { watch = false } =
    typeof config !== 'object' ? { watch: config } : config;

  const context = createContext<UseStoreDataReturnType<T> | null>(null);
  context.displayName = debugName;

  const useStoreRef = createUseRefContext(context);

  return {
    /**
     * using the value from here will never cause a rerender as context is based on refs.
     */
    useStoreRef: () => useStoreRef().store,

    /**
     *
     * the value is memoized and thus changing the value will have no effect.
     * use key prop to unmount and remount if necessary. alternatively use set from the context to update the value.
     *
     */
    Provider: createProvider<T>(
      context as Context<UseStoreDataReturnType<T>>,
      watch
    ),

    /**
     *
     * @param selector
     * @param equalityCheck
     * @returns tuple, first item is return value of the selector and the second item is setter
     *
     */
    useContext: <SelectorOutput,>(
      selector: Selector<T, SelectorOutput>,
      equalityCheck: EqualityCheck = shallowCompare
    ) => useFastContextStore(context, selector, equalityCheck),

    /**
     *
     * @param selector
     * @param equalityCheck
     * @returns return value of the selector
     *
     */
    useContextValue: <SelectorOutput,>(
      selector: Selector<T, SelectorOutput>,
      equalityCheck: EqualityCheck = shallowCompare
    ) => useStoreValue(context, selector, equalityCheck),

    /** Returns the setter method */
    useSetStore: () => useStoreRef().set,

    /**
     * context of the store. Useful for ContextBridge
     */
    Context: context,
  };
};

export const createProvider = <T extends StoreDataType = StoreDataType>(
  StoreContext: Context<UseStoreDataReturnType<T>>,
  watch: boolean
) => {
  return Object.assign(
    memo(function CreateFastContext({
      value,
      children,
      onChange,
    }: ProviderProps<T>) {
      return (
        <StoreContext.Provider value={useStoreData<T>(value, onChange, watch)}>
          {children}
        </StoreContext.Provider>
      );
    }),
    { displayName: StoreContext.displayName }
  );
};

export const createUseRefContext = <T extends StoreDataType = StoreDataType>(
  _Context: Context<UseStoreDataReturnType<T> | null>
) => {
  return () => {
    const value = useInvariantContext(
      _Context,
      'Fast Context requires the value to be wrapped in a Provider with a value.'
    );
    return value;
  };
};

export const useFastContextStore = <
  IStore extends StoreDataType,
  SelectorOutput,
>(
  _Context: Context<UseStoreDataReturnType<IStore> | null>,
  selector: Selector<IStore, SelectorOutput>,
  equalityFn = Object.is
): [value: SelectorOutput, set: UseStoreDataReturnType<IStore>['set']] => {
  const store = useInvariantContext(_Context, 'Store not found');

  const state = useSyncExternalStoreWithSelector(
    store.subscribe,
    () => {
      return store.get();
    },
    undefined,
    (snapshot) => {
      return selector(snapshot);
    },
    equalityFn
  );

  return [state, store.set];
};

export const useStoreValue = <IStore extends StoreDataType, SelectorOutput>(
  _Context: Context<UseStoreDataReturnType<IStore> | null>,
  selector: Selector<IStore, SelectorOutput>,
  equalityFn = Object.is
) => {
  return useFastContextStore(_Context, selector, equalityFn);
};
