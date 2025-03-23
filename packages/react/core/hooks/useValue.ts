import { set } from '@binaryoperations/json-forms-core/internals/object';
import { useState } from 'react';
type State<T> = {
  value: T | undefined;
  previousValue: T | undefined;
  initialValue: T | undefined;
};

type InternalState<T> = Partial<Record<'__READONLY__STATE__', State<T>>> &
  State<T>;

const useValue = <T>(value?: T) => {
  const [proxy] = useState(() => {
    const state: InternalState<T> = {
      value: value as T | undefined,
      previousValue: undefined as T | undefined,
      initialValue: value as T | undefined,
    };

    return new Proxy(state, {
      get(target, prop) {
        switch (prop) {
          case '__READONLY__STATE__':
            return Object.freeze({ ...target });
          case 'toJSON':
            return () => target.value;
          case 'toString':
            return () => JSON.stringify(target.value ?? {});
          default:
            return Reflect.get(target, prop);
        }
      },
      set: (target, prop, value) => {
        if (!prop.toString().startsWith('value')) {
          console.error('Unable to set the a prop other than value');
          return false;
        }
        if (target.value === value) return true;
        target.previousValue = target.value;
        target.value = set(target, prop, value).value;
        return true;
      },
      preventExtensions: () => true,
    });
  });

  proxy.value = value;

  return proxy;
};

export default useValue;
