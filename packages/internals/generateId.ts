let i = 0;

export const generateId = (prefix: string = 'id') => {
  i += 1;
  return `${prefix}-${i}`;
};
