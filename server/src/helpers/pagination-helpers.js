const { filterQueryParams } = require('../helpers/query-params-helpers');

const paginate = (collection, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  return collection.slice(startIndex, endIndex);
};

const applyPagination = (data, paginationParamsArr) => {
  let pageNumber = 1;
  let pageSize = 10;
  paginationParamsArr.forEach(({ name, values }) => {
    const lastArrayItem = Number(values.slice(-1));
    if (name === '_page') {
      pageNumber = lastArrayItem;
    }
    if (name === '_limit') {
      pageSize = lastArrayItem;
    }
  });
  return paginatedData = paginate(data, pageNumber, pageSize);
}

const paginationParamsNames = ['_page', '_limit'];

const formatPagination = (queryParams) => {
  const paginationParamsArr = filterQueryParams(queryParams, paginationParamsNames);
  return paginationParamsArr.map(([name, value]) => ({
    name,
    values: value instanceof Array ? [...new Set(value)] : [value],
  }));
}

module.exports = {
  paginate,
  applyPagination,
  formatPagination
};
