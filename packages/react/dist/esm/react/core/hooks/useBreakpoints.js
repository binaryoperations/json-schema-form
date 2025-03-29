import { useMemo } from 'react';
import { useMediaQuery } from './useMediaQuery';
export function useBreakpoints(props) {
    const { breakpoints, ...rest } = props;
    const { xs, sm, md, lg, xl } = {
        xs: useMediaQuery('(max-width: 460px)'),
        sm: useMediaQuery('(min-width: 460px) and (max-width: 787px)'),
        md: useMediaQuery('(min-width: 787px) and (max-width: 992px)'),
        lg: useMediaQuery('(min-width: 992px) and (max-width: 1280px)'),
        xl: useMediaQuery('(min-width: 1280px)'),
    };
    const currentBreakpoint = useMemo(() => {
        if (!breakpoints)
            return;
        const breakpointsDefinitions = { xs, sm, md, lg, xl };
        const keys = ['xs', 'sm', 'md', 'lg', 'xl'];
        let counter = 0;
        let previous = 'xs';
        while (true) {
            const key = keys[counter];
            if (!key)
                break;
            if (breakpointsDefinitions[key])
                return breakpoints?.[key] ? key : previous;
            counter++;
            previous = breakpoints?.[key] ? key : previous;
        }
        return previous;
        // return breakpoints?.[key] && !breakpoints[previous] ? key : previous;
    }, [breakpoints, xs, sm, md, lg, xl]);
    const value = breakpoints?.[currentBreakpoint];
    return {
        value,
        props: rest,
        currentBreakpoint,
    };
}
//# sourceMappingURL=useBreakpoints.js.map