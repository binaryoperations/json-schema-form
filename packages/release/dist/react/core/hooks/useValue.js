import { set } from '../../../core/internals/object';
import { useState } from 'react';
const useValue = (value) => {
    const [proxy] = useState(() => {
        const state = {
            value: value,
            previousValue: undefined,
            initialValue: value,
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
                if (target.value === value)
                    return true;
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
