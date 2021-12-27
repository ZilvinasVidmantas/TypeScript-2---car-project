const jsonServer = require('json-server');
const database = require('../database.json');
const { createFilterFunctions, applyFilters } = require('./helpers/filters-helpers');
const { filterQueryParams } = require('./helpers/query-params-helpers');
// let formatFilters = require('./helpers/server-helpers')

const DATABASE_FILE = 'database.json';

const PORT = 5000;

const server = jsonServer.create();
const router = jsonServer.router(DATABASE_FILE);
const middlewares = jsonServer.defaults();
server.use(middlewares);

// custom route's should be added before server.use(router);

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

server.get('/cars/joined/:id', (req, res) => {
  const { id } = req.params;
  const { cars } = database;
  const car = getJoinedCar(cars.find((x) => x.id === id));

  res.json(car);
});

const paginate = (collection, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  return collection.slice(startIndex, endIndex);
};

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
const formatPagination = (queryParams) => {
  const paginationParamsArr = filterQueryParams(queryParams, paginationParamsNames);
  return paginationParamsArr.map(([name, value]) => ({
    name,
    values: value instanceof Array ? [...new Set(value)] : [value],
  }));
}

server.get('/cars/joined', (req, res) => {
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

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on:\nhttp://localhost:${PORT}`);
});
