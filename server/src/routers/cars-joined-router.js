const { Router } = require('express');
const { createFilterFunctions, applyFilters } = require('../helpers/filters-helpers');
const { filterQueryParams } = require('../helpers/query-params-helpers');
const { applySorting } = require('../helpers/sorting-helpers');
const { filterParamsTypes, sortingParamsNames, paginationParamsNames } = require('./router-data');
const { applyPagination } = require('../helpers/pagination-helpers');
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

const formatFilterFunctions = (queryParams) => {
  const filterParamsNames = filterParamsTypes.map(x => x.name);
  const filterQueryParamsArr = filterQueryParams(queryParams, filterParamsNames);
  const filterFunctions = createFilterFunctions(filterQueryParamsArr, filterParamsTypes);

  return filterFunctions;
};

router.get('/', (req, res) => {
  const { cars } = database;
  const joinedCars = cars.map(getJoinedCar);
  const queryParams = req.query;

  // 1. Filtravimas
  const filterFunctions = formatFilterFunctions(queryParams);
  const filteredCars = applyFilters(joinedCars, filterFunctions);

  // 2. Rikiavimas
  const sortingParamsArr = filterQueryParams(queryParams, sortingParamsNames);
  const sortedCars = applySorting(filteredCars, sortingParamsArr);

  // 3. Puslapiavimas
  const paginationParamsArr = filterQueryParams(queryParams, paginationParamsNames);
  const paginatedCars = applyPagination(sortedCars, paginationParamsArr)

  res.json(paginatedCars);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const { cars } = database;
  const car = getJoinedCar(cars.find((x) => x.id === id));

  res.json(car);
});

module.exports = router;
