const isDev = process.env.NODE_ENV === 'development';
export const useMaybeDevValue = (devCallback, prodCallback) => {
    return isDev ? devCallback() : prodCallback();
};
