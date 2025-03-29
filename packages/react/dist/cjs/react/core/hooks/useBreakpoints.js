import { useMemo } from 'react';
import { useMediaQuery } from './useMediaQuery';
export function useBreakpoints(props) {
    const { breakpoints, ...rest } = props;
    const { xs, sm, md, lg, xl } = {
        xs: useMediaQuery('(max-width: 460px)'),
        sm: useMediaQuery('(min-width: 460px) and (max-width: 787px)'),
        md: useMediaQuery('(max-width: 787px) and (max-width: 992px)'),
        lg: useMediaQuery('(max-width: 992px) and (max-width: 1280px)'),
        xl: useMediaQuery('(min-width: 1280px)'),
    };
    const currentBreakpoint = useMemo(() => {
        const breakpointsDefinitions = { xs, sm, md, lg, xl };
        const keys = ['xs', 'sm', 'md', 'lg', 'xl'];
        return keys.reduce((previous, key) => {
            if (breakpointsDefinitions[key])
                return breakpoints?.[key] ? key : previous;
            return previous;
        }, 'xs');
    }, [breakpoints, xs, sm, md, lg, xl]);
    const value = breakpoints?.[currentBreakpoint];
    return {
        value,
        props: rest,
        currentBreakpoint,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQnJlYWtwb2ludHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb3JlL2hvb2tzL3VzZUJyZWFrcG9pbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFaEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhELE1BQU0sVUFBVSxjQUFjLENBQzVCLEtBQTJDO0lBRTNDLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFFdkMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRztRQUM3QixFQUFFLEVBQUUsYUFBYSxDQUFDLG9CQUFvQixDQUFDO1FBQ3ZDLEVBQUUsRUFBRSxhQUFhLENBQUMsMkNBQTJDLENBQUM7UUFDOUQsRUFBRSxFQUFFLGFBQWEsQ0FBQywyQ0FBMkMsQ0FBQztRQUM5RCxFQUFFLEVBQUUsYUFBYSxDQUFDLDRDQUE0QyxDQUFDO1FBQy9ELEVBQUUsRUFBRSxhQUFhLENBQUMscUJBQXFCLENBQUM7S0FDekMsQ0FBQztJQUVGLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNyQyxNQUFNLHNCQUFzQixHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ3RELE1BQU0sSUFBSSxHQUEwQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVuRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxzQkFBc0IsQ0FBQyxHQUFHLENBQUM7Z0JBQzdCLE9BQU8sV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQzdDLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV0QyxNQUFNLEtBQUssR0FBRyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRS9DLE9BQU87UUFDTCxLQUFLO1FBQ0wsS0FBSyxFQUFFLElBQUk7UUFDWCxpQkFBaUI7S0FDbEIsQ0FBQztBQUNKLENBQUMifQ==