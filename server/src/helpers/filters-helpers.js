const filterFunctionsCreators = {
  'one-to-many': (name, values) => (entity) => values.includes(entity[`${name}Id`]),
  'many-to-many': (name, values) => (entity) => values.some((id) => entity[`${name}Id`].includes(id)),
};

const createFilterFunctions = (paramsArr, types ) => {
  return paramsArr.map(([name, value]) => {
    const values = value instanceof Array ? [...new Set(value)] : [value];
    const filterParamType = types.find(type => type.name === name).type;
    const filterFunctionCreator = filterFunctionsCreators[filterParamType];
    const filterFn = filterFunctionCreator(name, values);
    return filterFn;
  });
}

module.exports = {
  filterFunctionsCreators,
  createFilterFunctions
}
