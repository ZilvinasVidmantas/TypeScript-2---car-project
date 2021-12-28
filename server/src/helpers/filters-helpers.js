const filterFunctionsCreators = {
  'one-to-many': (name, values) => (entity) => values.includes(entity[`${name}Id`]),
  'many-to-many': (name, values) => (entity) => values.some((id) => entity[`${name}Id`].includes(id)),
  'gte': (name, values) => (entity) => values.map(Number).some(el => el <= entity[name.slice(0, -4)]),
  'lte': (name, values) => (entity) => values.map(Number).some(el => el >= entity[name.slice(0, -4)])
};

const createFilterFunctions = (paramsArr, types) => {
  return paramsArr.map(([name, values]) => {
    const filterParamType = types.find(type => type.name === name).type;
    const filterFunctionCreator = filterFunctionsCreators[filterParamType];
    const filterFn = filterFunctionCreator(name, values);
    return filterFn;
  });
}

const applyFilters = (collection, filtersFunctions) => {
  return filtersFunctions.reduce(
    (filteredCollection, filterFn) => filteredCollection.filter(filterFn),
    collection
  );
}

module.exports = {
  filterFunctionsCreators,
  createFilterFunctions,
  applyFilters
}
