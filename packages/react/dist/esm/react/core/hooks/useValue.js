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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb3JlL2hvb2tzL3VzZVZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBVWpDLE1BQU0sUUFBUSxHQUFHLENBQUksS0FBUyxFQUFFLEVBQUU7SUFDaEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUU7UUFDNUIsTUFBTSxLQUFLLEdBQXFCO1lBQzlCLEtBQUssRUFBRSxLQUFzQjtZQUM3QixhQUFhLEVBQUUsU0FBMEI7WUFDekMsWUFBWSxFQUFFLEtBQXNCO1NBQ3JDLENBQUM7UUFFRixPQUFPLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtZQUN0QixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUk7Z0JBQ2QsUUFBUSxJQUFJLEVBQUU7b0JBQ1osS0FBSyxxQkFBcUI7d0JBQ3hCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztvQkFDdEMsS0FBSyxRQUFRO3dCQUNYLE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDNUIsS0FBSyxVQUFVO3dCQUNiLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNsRDt3QkFDRSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNwQztZQUNILENBQUM7WUFDRCxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDeEMsT0FBTyxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO29CQUMzRCxPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssS0FBSztvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFDeEMsTUFBTSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNwQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDOUMsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBQ0QsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSTtTQUM5QixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBRXBCLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBRUYsZUFBZSxRQUFRLENBQUMifQ==