export const userSelectFields = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  createdAt: true,
  updatedAt: true,
  password: false,
};

export const taskQueryFields = ["searchTerm", "priority", "status"];

export const taskSearchableFields = ["title"];

export const paginationFields = ["page", "limit", "sortBy", "sortOrder"];
