export const createUrlParamObj = (searchParams, additionParams) => {
  const paramObj = {};
  const addParam = (value, key) => {
    if (!paramObj[key]) {
      paramObj[key] = [value];
    } else if (!paramObj[key].includes(value)) {
      paramObj[key].push(value);
    }
  };
  searchParams.forEach(addParam);
  if (additionParams) {
    additionParams.forEach(({ value, key }) => {
      addParam(value, key);
    });
  }

  return paramObj;
};

export const appendUrlParam = (name, params) => {
  let filters;
  const idArray = params[name];
  if (idArray) {
    filters = idArray.map((id) => `${name}Id=${id}`).join('&');
  }
  return filters;
};
export const appendUrlParams = (requestUrl, params) => {
  const url = requestUrl;
  const paramsArray = Object.entries(params);
  const buildeFilters = paramsArray.reduce((prevVal, currVal) => {
    let previous = prevVal;
    previous += `&${appendUrlParam(currVal[0], params)}`;
    return previous;
  }, '');
  const buildedUrl = `${url}${buildeFilters}`;
  return buildedUrl;
};

export const handleErrors = (err) => {
  if (err.response) {
    throw new Error('Server Error: Problems With Response', err.response.status);
  } else if (err.request) {
    throw new Error('Server Error: Problems With Request: ', err.response.status);
  } else {
    throw new Error('Error', err.message);
  }
};
