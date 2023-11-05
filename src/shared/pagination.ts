type IReturnPagination = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

export const calculatePagination = (
  page: number,
  limit: number,
  sortBy: string = "createdAt",
  sortOrder: string = "desc"
): IReturnPagination => {
  page = page ? page : 1;
  limit = limit ? limit : 10;
  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
