const jsonServer = require('json-server');
const database = require('../database.json');

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

server.get('/cars/joined', (req, res) => {
  const { cars } = database;
  const joinedCars = cars.map(getJoinedCar);

  const queryParams = req.query;
  let filteredCars = joinedCars;
  Object.entries(queryParams).forEach(([paramName, paramValue]) => {
    switch (paramName) {
      case 'brand': {
        const possibleBrandIds = paramValue instanceof Array ? paramValue : [paramValue];
        filteredCars = filteredCars.filter((car) => possibleBrandIds.includes(car.brandId));
        break;
      }
      case '_page': {
        const pageSize = queryParams._limit ? Number(queryParams._limit) : 10;
        filteredCars = paginate(filteredCars, paramValue, pageSize);
        break;
      }

      default:
        break;
    }
  });

  res.json(filteredCars);
});

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on:\nhttp://localhost:${PORT}`);
});
