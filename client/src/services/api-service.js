import axios from 'axios';
import { appendUrlParams } from '../helpers/index';

const appendBrandToCar = (car, brands) => ({
  ...car,
  brandId: brands.find((brand) => brand.id === car.model.brandId),
  brand: brands.find((brand) => brand.id === car.model.brandId),
});

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

const getBrands = async () => {
  try {
    const response = await instance.get('/brands');
    return response.data;
  } catch (error) {
    throw new Error('Aprašyta klaida: Serverio klaida');
  }
};

const getModels = async () => {
  try {
    const response = await instance.get('/models');
    return response.data;
  } catch (error) {
    throw new Error('Aprašyta klaida: Serverio klaida');
  }
};

const getTransmissions = async () => {
  try {
    const response = await instance.get('/transmissions');
    return response.data;
  } catch (error) {
    throw new Error('Aprašyta klaida: Serverio klaida');
  }
};

const getFuelTypes = async () => {
  try {
    const response = await instance.get('/fuelTypes');
    return response.data;
  } catch (error) {
    throw new Error('Aprašyta klaida: Serverio klaida');
  }
};

const getJoinedCars = async (params) => {
  const requestUrl = '/cars?_expand=user&_expand=model&_expand=transmission';

  appendUrlParams(requestUrl, params);

  const [cars, brands] = await Promise.all([
    (async () => {
      const response = await instance.get(requestUrl);
      return response.data;
    })(),
    getBrands(),
  ]);
  const joinedCars = cars.map((car) => appendBrandToCar(car, brands));

  return joinedCars;
};

const getJoinedCar = async (id) => {
  try {
    const [car, brands] = await Promise.all([
      (async () => {
        const response = await instance.get(
          `/cars/${id}?_expand=user&_expand=model&_expand=transmission`,
        );
        return response.data;
      })(),
      getBrands(),
    ]);
    const joinedCar = appendBrandToCar(car, brands);
    return joinedCar;
  } catch (error) {
    throw new Error('Aprašyta klaida: Serverio klaida');
  }
};

const API = {
  getJoinedCars,
  getJoinedCar,
  getBrands,
  getModels,
  getTransmissions,
  getFuelTypes,
};

export default API;
