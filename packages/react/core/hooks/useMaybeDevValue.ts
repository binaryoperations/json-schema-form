const isDev = process.env.NODE_ENV === 'development';

export const useMaybeDevValue = <T>(
  devCallback: () => T,
  prodCallback: () => T
) => {
  return isDev ? devCallback() : prodCallback();
};
