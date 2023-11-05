export type IPaginationOptions = {
  page: string;
  limit: string;
  sortBy: string;
  sortOrder: string;
};

export type ITaskSearchField = {
  searchTerm: string;
  title: string;
  status: string;
  priority: string;
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
    prevPage: number | null;
    nextpage: number | null;
    totalPages: number | null;
  };
  data: T;
};
