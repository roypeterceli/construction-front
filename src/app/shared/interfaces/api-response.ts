export interface ApiResponse<T> {
  status: boolean | null | undefined;
  message: string | null | undefined;
  data: T | null | undefined;
}

export interface Page<T> {
  items: T[] | null | undefined;
  total: number;
  page: number;
  size: number;
}
