export type Column<T> = {
  key: string;
  label: string;
  header?: () => React.ReactNode;
  render?: (row: T) => React.ReactNode;
  hideable?: boolean;
};

