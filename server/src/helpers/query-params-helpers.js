const createQueryParamArray = (queryParams) => Object.entries(queryParams);

const filterQueryParams = (queryParams, names) => {
  const paramArray = createQueryParamArray(queryParams);

  return paramArray.filter(([name]) => names.includes(name));
}

module.exports = {
  createQueryParamArray,
  filterQueryParams
};