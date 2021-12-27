const filterFunctionsCreators = {
  'one-to-many': (name, values) => (entity) => values.includes(entity[`${name}Id`]),
  'many-to-many': (name, values) => (entity) => values.some((id) => entity[`${name}Id`].includes(id)),
};

module.exports = {
  filterFunctionsCreators
}
