export type ColumnType = 'number'| 'text' | 'image' | 'badge' | 'tags' | 'button' | 'date' | 'icon';

export interface TableColumn<T> {
  label: string;
  property: Extract<keyof T, string>;
  type: ColumnType;
  visible?: boolean;
  cssClasses?: string[];
  enableAction?: boolean;
  withAction?: boolean;
  allowCtrlClick?: boolean;
  format?: string;
  icon?: string;
}

export interface ColumnCellAction<T> {
  column: Extract<keyof T, string>;
  data: T
}
