export interface PaginationInterface<T> {
  total: number;
  recordPerPage: number;
  currentPage: number;
  totalPages: number;
  nextPage: number | null;
  remainingCount: number;
  data: T;
}
