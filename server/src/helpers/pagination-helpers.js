const { filterQueryParams } = require('../helpers/query-params-helpers');
const { paginationParamsNames } = require('../routers/router-data');

const paginate = (collection, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  return collection.slice(startIndex, endIndex);
};

const applyPagination = (data, paginationParamsArr) => {
  let pageNumber = 1;
  let pageSize = data.length;
  paginationParamsArr.forEach(({ name, values }) => {
    const lastArrayItem = Number(values.slice(-1));
    if (name ==='_page') {
      pageNumber = lastArrayItem;
    } 
    if (name === '_limit'){
      pageSize = lastArrayItem;
    }
  });
  return paginatedData = paginate(data, pageNumber, pageSize);
}

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
