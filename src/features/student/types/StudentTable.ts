export type Column = {
  key: string;
  label: string;
  header?: () => React.ReactNode;
  render?: (row: Record<string, unknown>) => React.ReactNode;
  hideable?: boolean;
};