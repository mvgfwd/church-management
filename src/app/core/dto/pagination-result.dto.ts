export interface PaginationResultDTO<T> {
  currentPage: number;
  totalItems: number;
  lastPage: number;
  totalItemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  data: T[];
}
