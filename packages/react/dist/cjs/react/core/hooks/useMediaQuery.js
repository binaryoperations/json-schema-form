import { useCallback, useEffect, useState } from 'react';
/**
 * `useMediaQuery` is a hook for responding to CSS media queries in JavaScript.
 * It evaluates a media query string and returns a boolean indicating whether the query matches.
 *
 * @param query - The CSS media query string.
 * @return - A boolean value indicating if the media query matches.
 */
const getMediaQueryList = (mediaQuery) => {
    if (typeof window === 'undefined' ||
        typeof window.matchMedia === 'undefined') {
        return undefined;
    }
    return window.matchMedia(mediaQuery);
};
function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => getMediaQueryList(query)?.matches ?? false);
    const handleChange = useCallback((event) => {
        setMatches(event.matches);
    }, []);
    useEffect(() => {
        const mediaQueryList = getMediaQueryList(query);
        if (!mediaQueryList)
            return;
        mediaQueryList.addEventListener('change', handleChange);
        return () => {
            mediaQueryList.removeEventListener('change', handleChange);
        };
    }, [query, handleChange]);
    return matches;
}
export { useMediaQuery };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlTWVkaWFRdWVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvcmUvaG9va3MvdXNlTWVkaWFRdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFekQ7Ozs7OztHQU1HO0FBRUgsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLFVBQWtCLEVBQUUsRUFBRTtJQUMvQyxJQUNFLE9BQU8sTUFBTSxLQUFLLFdBQVc7UUFDN0IsT0FBTyxNQUFNLENBQUMsVUFBVSxLQUFLLFdBQVcsRUFDeEM7UUFDQSxPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUVELE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUM7QUFFRixTQUFTLGFBQWEsQ0FBQyxLQUFhO0lBQ2xDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUNwQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLElBQUksS0FBSyxDQUNqRCxDQUFDO0lBRUYsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLENBQUMsS0FBMEIsRUFBRSxFQUFFO1FBQzlELFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVAsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNiLE1BQU0sY0FBYyxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxjQUFjO1lBQUUsT0FBTztRQUU1QixjQUFjLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXhELE9BQU8sR0FBRyxFQUFFO1lBQ1YsY0FBYyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM3RCxDQUFDLENBQUM7SUFDSixDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUUxQixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxDQUFDIn0=