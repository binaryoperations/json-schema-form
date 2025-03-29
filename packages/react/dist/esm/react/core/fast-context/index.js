import { jsx as _jsx } from "react/jsx-runtime";
import { shallowCompare } from '../../../core/internals/object';
import { createContext, memo, useCallback, useEffect, useMemo, useRef, } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
import { useInvariantContext } from '../hooks/useInvariantContext';
import useSafeCallback from '../hooks/useSafeCallback';
import useValue from '../hooks/useValue';
const noop = () => { };
const useStoreData = (value, onChange, watch = false) => {
    const store = useRef(value);
    const watchRef = useRef(watch);
    const effectRef = useRef(false);
    const hasOnChange = useRef(!!onChange).current;
    const onChangeRef = useSafeCallback(onChange ?? noop);
    const get = useCallback(() => store.current, [store]);
    const subscribers = useRef(new Set());
    const set = useCallback((callback) => {
        store.current = { ...store.current, ...callback(store.current) };
        if (!effectRef.current && hasOnChange)
            onChangeRef(store.current);
        else
            subscribers.current.forEach((subscriber) => subscriber());
        effectRef.current = false;
    }, [store, onChangeRef, hasOnChange]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb3JlL2Zhc3QtY29udGV4dC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUNwRixPQUFPLEVBR0wsYUFBYSxFQUNiLElBQUksRUFHSixXQUFXLEVBQ1gsU0FBUyxFQUNULE9BQU8sRUFDUCxNQUFNLEdBQ1AsTUFBTSxPQUFPLENBQUM7QUFDZixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUV6RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNuRSxPQUFPLGVBQWUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLFFBQVEsTUFBTSxtQkFBbUIsQ0FBQztBQWN6QyxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7QUFFdEIsTUFBTSxZQUFZLEdBQUcsQ0FDbkIsS0FBYSxFQUNiLFFBQXNDLEVBQ3RDLEtBQUssR0FBRyxLQUFLLEVBQ21CLEVBQUU7SUFDbEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFTLEtBQWUsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDL0MsTUFBTSxXQUFXLEdBQUcsZUFBZSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUV0RCxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFdEQsTUFBTSxX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