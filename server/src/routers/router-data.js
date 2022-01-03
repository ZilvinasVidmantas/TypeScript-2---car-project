const filterParamsTypes = [{
  name: 'brand',
  type: 'one-to-many'
}, {
  name: 'model',
  type: 'one-to-many'
}, {
  name: 'transmission',
  type: 'one-to-many'
}, {
  name: 'fuelType',
  type: 'many-to-many'
}, {
  name: 'price_lte',
  type: 'lte'
}, {
  name: 'price_gte',
  type: 'gte'
}, {
  name: 'year_gte',
  type: 'lte'
}, {
  name: 'year_lte',
  type: 'gte'
}];

const sortingParamsNames = ['_sort_asc', '_sort_desc'];

const paginationParamsNames = ['_page', '_limit']

module.exports = {
  filterParamsTypes,
  sortingParamsNames,
  paginationParamsNames
}