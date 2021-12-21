import { appendUrlParams } from '../helpers/index';

const appendBrandToCar = (car, brands) => ({
  ...car,
  brandId: brands.find((brand) => brand.id === car.model.brandId),
  brand: brands.find((brand) => brand.id === car.model.brandId),
});

const fetchBrands = async () => {
  try {
    const response = await fetch('http://localhost:5000/brands');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Aprašyta klaida: Serverio klaida');
  }
};

const fetchModels = async () => {
  try {
    const response = await fetch('http://localhost:5000/models');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Aprašyta klaida: Serverio klaida');
  }
};

const fetchTransmissions = async () => {
  try {
    const response = await fetch('http://localhost:5000/transmissions');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Aprašyta klaida: Serverio klaida');
  }
};

const fetchFuelTypes = async () => {
  try {
    const response = await fetch('http://localhost:5000/fuelTypes');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Aprašyta klaida: Serverio klaida');
  }
};

const fetchJoinedCars = async (params) => {
  const requestUrl = 'http://localhost:5000/cars?_expand=user&_expand=model&_expand=transmission';

  appendUrlParams(requestUrl, params);

  const [cars, brands] = await Promise.all([
    (async () => {
      const response = await fetch(requestUrl);
      return response.json();
    })(),
    fetchBrands(),
  ]);
  const joinedCars = cars.map((car) => appendBrandToCar(car, brands));

  return joinedCars;
};

const fetchJoinedCar = async (id) => {
  try {
    const [car, brands] = await Promise.all([
      (async () => {
        const response = await fetch(
          `http://localhost:5000/cars/${id}?_expand=user&_expand=model&_expand=transmission`,
        );
        return response.json();
      })(),
      fetchBrands(),
    ]);
    const joinedCar = appendBrandToCar(car, brands);
    return joinedCar;
  } catch (error) {
    throw new Error('Aprašyta klaida: Serverio klaida');
  }
};

const API = {
  fetchJoinedCars,
  fetchJoinedCar,
  fetchBrands,
  fetchModels,
  fetchTransmissions,
  fetchFuelTypes,
};

export default API;
