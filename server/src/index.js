const jsonServer = require('json-server');
const path = require('path');

const PORT = 5000;
const DATABASE_FILE = 'database.json';

const server = jsonServer.create();
const router = jsonServer.router(DATABASE_FILE);
const middlewares = jsonServer.defaults();

// custom route's should be added before server.use(router);
const database = require(path.join("..", DATABASE_FILE));

const getJoinedCar = ({ modelId, userId, transmissionId, ...car}) => {
	const {brands, models, users, transmissions, fuelTypes, carFuelTypes} = database;

	const model = models.find(model => model.id === modelId);
	const user = users.find(user => user.id === userId);
	const brand = brands.find(brand => brand.id === model.brandId);
	const transmission = transmissions.find(transmission => transmission.id === transmissionId,);
	const fuelType = carFuelTypes
		.filter(carFuelType => carFuelType.carId === car.id)
		.map(fuelTypePivot => fuelTypes.find(fuelType => fuelType.id === fuelTypePivot.fuelTypeId).title)
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
		transmission: transmission.title
	}
};

server.get('/cars/joined/:id', (req, res) => {
	const id = req.params.id;
	const {cars} = database;
	const car = getJoinedCar(cars.find(car => car.id === id));

	res.json(car)
});

server.get('/cars/joined', (req, res) => {
	const {cars} = database;
	const joinedCars = cars.map(getJoinedCar);

	const queryParams = req.query;
	let filteredCars = joinedCars;
	Object.entries(queryParams).forEach(([paramName, paramValue]) => {
		switch (paramName) {
			case 'brand':
					const possibleBrandIds = paramValue instanceof Array ?  paramValue : [paramValue];
					filteredCars = filteredCars.filter(car => possibleBrandIds.includes(car.brandId))
				break;

			default:
				break;
		}
	});

  res.json(filteredCars)
})

server.use(middlewares);
server.use(router);
server.listen(PORT, () => {
	console.log(`JSON Server is running on:\nhttp://localhost:${PORT}`);
});
