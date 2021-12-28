const createQueryParamsArr = (queryParams) => { 
  const queryParamsArray = Object.entries(queryParams);

  return queryParamsArray.map(([name, value]) => ([
    name,
    value instanceof Array ? [...new Set(value)] : [value]
   ]))
};

const filterQueryParams = (queryParams, names) => {
  const paramArray = createQueryParamsArr(queryParams);

  return paramArray.filter(([name]) => names.includes(name));
}

module.exports = {
  createQueryParamsArr,
  filterQueryParams
};