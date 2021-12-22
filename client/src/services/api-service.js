import axios from 'axios';
import { appendUrlParams, handleErrors } from '../helpers/index';

const appendBrandToCar = (car, brands) => ({
  ...car,
  brandId: brands.find((brand) => brand.id === car.model.brandId),
  brand: brands.find((brand) => brand.id === car.model.brandId),
});

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

const getBrands = async () => {
  const response = await instance.get('/brands').then((resp) => resp.data).catch(handleErrors);
  return response;
};

const getModels = async () => {
  const response = await instance.get('/models').then((resp) => resp.data).catch(handleErrors);
  return response;
};

const getTransmissions = async () => {
  const response = await instance.get('/transmissions').then((resp) => resp.data).catch(handleErrors);
  return response;
};

const getFuelTypes = async () => {
  const response = await instance.get('/fuelTypes').then((resp) => resp.data).catch(handleErrors);
  return response;
};

const getJoinedCars = async (params) => {
  const requestUrl = 'http://localhost:5000/cars?_expand=user&_expand=model&_expand=transmission';
  const geratedUrl = appendUrlParams(requestUrl, params);

  const [cars, brands] = await Promise.all([
    (async () => {
      const response = await axios.get(geratedUrl);
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
