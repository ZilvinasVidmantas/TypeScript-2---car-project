const jsonServer = require('json-server');
const database = require('../database.json');
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

const filterNames = ['brand', 'model', 'transmission', 'fuelType', '_page'];

const formatFilters = (queryParams) => {
  const filterParamsArr = Object.entries(queryParams)
    .filter(([name]) => filterNames.includes(name));
  return filterParamsArr.map(([name, value]) => ({
    name,
    values: value instanceof Array ? [...new Set(value)] : [value],
  }));
};

const pageinationNames = ['_page', '_limit'];
const formatPagination = (queryParams) => {
  const paginationParamsArr = Object.entries(queryParams)
    .filter(([name]) => filterNames.includes(name));
  return paginationParamsArr.map(([name, value]) => ({
    name,
    values: value instanceof Array ? [...new Set(value)] : [value],
  }));
}

server.get('/cars/joined', (req, res) => {
  const { cars } = database;
  const joinedCars = cars.map(getJoinedCar);

  const queryParams = req.query;
  const filterParamsArr = formatFilters(queryParams);
  const paginationParamsArr = formatPagination(queryParams);
  // 1. Filtravimas
  // 2. Puslapiavimas
  // 3. Rikiavimas
  let filteredArr = joinedCars;

  filterParamsArr.map(({ name, values }) => {
    // if (name === '_page') {
    //   const pageSize = queryParams._limit ? Number(queryParams._limit) : 10;
    //   filteredArr = paginate(filteredArr, values, pageSize);
    // } else {
    const idsArr = values instanceof Array ? values : [values];
    filteredArr = filteredArr.filter((obj) => idsArr.every((el) => obj[`${name}Id`].includes(el)))
    // }

    // if (name === 'brand') {
    //   const brandsIdsArr = values instanceof Array ? values : [values];
    //   filteredCars = filteredCars.filter((car) => brandsIdsArr.every((el) => car.brandId.includes(el)))
    // }
    // if (name === 'model') {
    //   const modelsIdsArr = values instanceof Array ? values : [values];
    //   filteredCars = filteredCars.filter((car) => modelsIdsArr.every((el) => car.modelId.includes(el)))
    // }
    // if (name === 'transmission') {
    //   const transmissionsIdsArr = values instanceof Array ? values : [values];
    //   filteredCars = filteredCars.filter((car) => transmissionsIdsArr.every((el) => car.transmissionId.includes(el)))
    // }
    // if (name === 'fuelType') {
    //   const fuelTypesIdsArr = values instanceof Array ? values : [values];
    //   filteredCars = filteredCars.filter((car) => fuelTypesIdsArr.every((el) => car.fuelTypeId.includes(el)))
    // }

    return filteredArr;
  })

  res.json(filteredArr);
});

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on:\nhttp://localhost:${PORT}`);
});
