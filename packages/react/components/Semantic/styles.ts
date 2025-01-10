export const styles = {
  row: {
    flexDirection: 'column',
    maxWidth: '100%',
    display: 'flex',
  },
  rowReverse: {
    flexDirection: 'column-reverse',
  },
  column: {
    display: 'flex',
    flexDirection: 'row',
  },
  columnReverse: {
    flexDirection: 'row-reverse',
  },
  tabChildren: {
    flex: 1,
  },
} as const;
