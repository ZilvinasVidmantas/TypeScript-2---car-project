const { Router } = require('express');
const { createFilterFunctions, applyFilters } = require('../helpers/filters-helpers');
const { filterQueryParams } = require('../helpers/query-params-helpers');
const database = require('../../database.json');

const router = Router();
const getJoinedCar = ({
  modelId, userId, transmissionId, ...car
}) => {
  const {
    brands, models, users, transmissions, fuelTypes, carFuelTypes,
  } = database;

  const model = models.find((x) => x.id === modelId);
  const user = users.find((x) => x.id === userId);
  const brand = brands.find((x) => x.id === model.brandId);
  const transmission = transmissions.find((x) => x.id === transmissionId);
  const fuelType = carFuelTypes
    .filter((carFuelType) => carFuelType.carId === car.id)
    .map((fuelTypePivot) => fuelTypes.find((x) => x.id === fuelTypePivot.fuelTypeId).title)
    .join('|');

  return {
    brandId: model.brandId,
    fuelTypeId: carFuelTypes
      .filter((carFuelType) => carFuelType.carId === car.id)
      .map((fuelTypePivot) => fuelTypes.find((x) => x.id === fuelTypePivot.fuelTypeId).id), ...car,
    ...car,
    modelId,
    userId,
    transmissionId,
    model: model.title,
    brand: brand.title,
    user,
    fuelType,
    transmission: transmission.title,
  };
};

const paginate = (collection, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  return collection.slice(startIndex, endIndex);
};

const formatPagination = (queryParams) => {
  const paginationParamsArr = filterQueryParams(queryParams, paginationParamsNames);
  return paginationParamsArr.map(([name, value]) => ({
    name,
    values: value instanceof Array ? [...new Set(value)] : [value],
  }));
}

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
}
  // Aprašyti query parametrus, kurie naudoja atitinkamas filterFunctionsCreators objekto filtravimo funkcijas: price_gt, price_lte ir t.t.
];

const formatFilterFunctions = (queryParams) => {
  const filterParamsNames = filterParamsTypes.map(x => x.name);
  const filterQueryParamsArr = filterQueryParams(queryParams, filterParamsNames);
  const filterFunctions = createFilterFunctions(filterQueryParamsArr, filterParamsTypes);

  return filterFunctions;
};

const paginationParamsNames = ['_page', '_limit'];

router.get('/', (req, res) => {
  const { cars } = database;
  const joinedCars = cars.map(getJoinedCar);

  const queryParams = req.query;
  const filterFunctions = formatFilterFunctions(queryParams);
  // 1. Filtravimas
  const filteredCars = applyFilters(joinedCars, filterFunctions);

  // 2. Puslapiavimas
  // const paginationParamsArr = formatPagination(queryParams);
  // if (name === '_page') {
  //   const pageSize = queryParams._limit ? Number(queryParams._limit) : 10;
  //   filteredArr = paginate(filteredArr, values, pageSize);
  // } 
  // 3. Rikiavimas

  res.json(filteredCars);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const { cars } = database;
  const car = getJoinedCar(cars.find((x) => x.id === id));

  res.json(car);
});

module.exports = router;