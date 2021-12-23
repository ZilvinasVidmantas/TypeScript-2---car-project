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

export const appendUrlParam = (name, values) => values.map((id) => `${name}Id=${id}`).join('&');

export const appendUrlParams = (requestUrl, params) => {
  const paramsArray = Object.entries(params);
  return paramsArray.reduce((prevVal, [name, values]) => {
    let previous = prevVal;
    previous += `&${appendUrlParam(name, values)}`;
    return previous;
  }, requestUrl);
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
