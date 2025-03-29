import { useCallback, useEffect, useState } from 'react';

/**
 * `useMediaQuery` is a hook for responding to CSS media queries in JavaScript.
 * It evaluates a media query string and returns a boolean indicating whether the query matches.
 *
 * @param query - The CSS media query string.
 * @return - A boolean value indicating if the media query matches.
 */

const getMediaQueryList = (mediaQuery: string) => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia === 'undefined'
  ) {
    return undefined;
  }

  return window.matchMedia(mediaQuery);
};

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(
    () => getMediaQueryList(query)?.matches ?? false
  );

  const handleChange = useCallback((event: MediaQueryListEvent) => {
    setMatches(event.matches);
  }, []);

  useEffect(() => {
    const mediaQueryList = getMediaQueryList(query);

    if (!mediaQueryList) return;

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query, handleChange]);

  return matches;
}

export { useMediaQuery };
