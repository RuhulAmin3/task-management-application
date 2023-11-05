const pickQuery = <T extends Record<string, unknown>, K extends keyof T>(
  query: T,
  fields: K[]
): Partial<T> => {
  const queryObj: Partial<T> = {};
  for (let field of fields) {
    if (query && query.hasOwnProperty.call(query, field)) {
      queryObj[field] = query[field];
    }
  }

  return queryObj;
};

export default pickQuery;
