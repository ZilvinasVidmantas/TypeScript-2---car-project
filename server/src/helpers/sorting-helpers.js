const applySorting = (data, sortingParamsArr) => {
  let sortedData = data;
  sortingParamsArr.forEach(([ order, field ]) => {
    if (order === '_sort_asc') {
      sortedData = data.sort((a, b) => a[field] - b[field]);
    }
    if (order === '_sort_desc') {
      sortedData = data.sort((a, b) => b[field] - a[field]);
    }
  })
  return sortedData;
};

module.exports = {
  applySorting
};
