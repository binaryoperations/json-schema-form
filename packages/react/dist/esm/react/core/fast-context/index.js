import { jsx as _jsx } from "react/jsx-runtime";
import { shallowCompare } from '../../../core/internals/object';
import { createContext, memo, useCallback, useEffect, useMemo, useRef, } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
import { useInvariantContext } from '../hooks/useInvariantContext';
import useSafeCallback from '../hooks/useSafeCallback';
import useValue from '../hooks/useValue';
const useStoreData = (value, onChange, watch = false) => {
    const store = useRef(value);
    const watchRef = useRef(watch);
    const effectRef = useRef(false);
    const onChangeRef = useSafeCallback(onChange ?? (() => { }));
    const get = useCallback(() => store.current, [store]);
    const subscribers = useRef(new Set());
    const set = useCallback((callback) => {
        store.current = { ...store.current, ...callback(store.current) };
        if (!effectRef.current && onChangeRef)
            onChangeRef(store.current);
        else
            subscribers.current.forEach((subscriber) => subscriber());
        effectRef.current = false;
    }, [store, onChangeRef]);
    const subscribe = useCallback((callback) => {
        subscribers.current.add(callback);
        return () => subscribers.current.delete(callback);
    }, []);
    /**
     *
     * The effect is required to trigger the updates on the consumers
     */
    useEffect(() => {
        if (!watchRef.current)
            return;
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
    return useMemo(() => ({
        get,
        set,
        subscribe,
        store,
    }), [get, set, subscribe]);
};
let counter = 0;
export const createFastContext = (debugName = `fast-context-${++counter}`, config) => {
    const { watch = false } = typeof config !== 'object' ? { watch: config } : config;
    const context = createContext(null);
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
        Provider: createProvider(context, watch),
        /**
         *
         * @param selector
         * @param equalityCheck
         * @returns tuple, first item is return value of the selector and the second item is setter
         *
         */
        useContext: (selector, equalityCheck = shallowCompare) => useFastContextStore(context, selector, equalityCheck),
        /**
         *
         * @param selector
         * @param equalityCheck
         * @returns return value of the selector
         *
         */
        useContextValue: (selector, equalityCheck = shallowCompare) => useStoreValue(context, selector, equalityCheck),
        /** Returns the setter method */
        useSetStore: () => useStoreRef().set,
        /**
         * context of the store. Useful for ContextBridge
         */
        Context: context,
    };
};
export const createProvider = (StoreContext, watch) => {
    return Object.assign(memo(function CreateFastContext({ value, children, onChange, }) {
        return (_jsx(StoreContext.Provider, { value: useStoreData(value, onChange, watch), children: children }));
    }), { displayName: StoreContext.displayName });
};
export const createUseRefContext = (_Context) => {
    return () => {
        const value = useInvariantContext(_Context, 'Fast Context requires the value to be wrapped in a Provider with a value.');
        return value;
    };
};
export const useFastContextStore = (_Context, selector, equalityFn = Object.is) => {
    const store = useInvariantContext(_Context, 'Store not found');
    const state = useSyncExternalStoreWithSelector(store.subscribe, () => {
        return store.get();
    }, undefined, (snapshot) => {
        return selector(snapshot);
    }, equalityFn);
    return [state, store.set];
};
export const useStoreValue = (_Context, selector, equalityFn = Object.is) => {
    return useFastContextStore(_Context, selector, equalityFn);
};
//# sourceMappingURL=index.js.map