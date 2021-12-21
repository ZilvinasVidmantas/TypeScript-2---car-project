export const getWindowWidth = () => Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0,
);

export const getCurrentBreakpoints = (breakpoints) => {
  const vw = getWindowWidth();
  const sortedBreakpoints = Object.entries(breakpoints).sort(
    (a, b) => b[1] - a[1],
  );

  const largestBreakpointIndex = sortedBreakpoints.findIndex(
    // eslint-disable-next-line no-unused-vars
    ([_, brValue]) => vw > brValue,
  );

  return sortedBreakpoints.slice(largestBreakpointIndex);
};

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
export const appendUrlParam = (requestUrl, name, values) => {
  let url = requestUrl;
  if (values.name) {
    const filters = values.map((filterName) => `${filterName}Id=${name}`).join('&');
    url += `&${filters}`;
  }
  return url;
};

export const appendUrlParams = (url, params) => {
  const paramsArray = Object.entries(params);
  const buildedUrl = paramsArray.map((x) => {
    const name = Object.keys(x);
    appendUrlParam(url, name, params);
    return name;
  });
  return buildedUrl;
};
