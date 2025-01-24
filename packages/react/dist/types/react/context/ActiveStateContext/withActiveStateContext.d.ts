import { type ComponentType } from 'react';
import type { ActiveStateContextPropsSingle, ActiveStateProps } from './types';
type C<P = object> = ComponentType<P>;
export default function withActiveStateContext<T extends Record<string, any>, ComponentProps = T & Pick<Required<ActiveStateContextPropsSingle>, 'onChange'>>(Component: C<ComponentProps>): import("react").NamedExoticComponent<T & ActiveStateProps> & ({
    displayName: string;
} | {
    displayName?: undefined;
});
export {};
//# sourceMappingURL=withActiveStateContext.d.ts.map