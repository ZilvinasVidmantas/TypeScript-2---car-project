import axios from 'axios';
import { appendUrlParams, dataFetchError } from '../helpers/index';

const appendProps = (car, brands, fuelTypes, carFuelTypes) => ({
  ...car,
  brandId: brands.find((brand) => brand.id === car.model.brandId),
  brand: brands.find((brand) => brand.id === car.model.brandId),
  fuelTypeId: carFuelTypes.filter((carFuelType) => carFuelType.carId === car.id)
    .map((fuelTypePivot) => fuelTypes.find((x) => x.id === fuelTypePivot.fuelTypeId).id),
  fuelType: carFuelTypes.filter((carFuelType) => carFuelType.carId === car.id)
    .map((fuelTypePivot) => fuelTypes.find((x) => x.id === fuelTypePivot.fuelTypeId).title)
    .join('/'),
});

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

const getBrands = async () => {
  try {
    const response = await instance.get('/brands');
    return response.data;
  } catch (error) {
    return dataFetchError(error);
  }
};

const getModels = async () => {
  try {
    const response = await instance.get('/models');
    return response.data;
  } catch (error) {
    return dataFetchError(error);
  }
};

const getTransmissions = async () => {
  try {
    const response = await instance.get('/transmissions');
    return response.data;
  } catch (error) {
    return dataFetchError(error);
  }
};

const getFuelTypes = async () => {
  try {
    const response = await instance.get('/fuelTypes');
    return response.data;
  } catch (error) {
    return dataFetchError(error);
  }
};

const getCarFuelTypes = async () => {
  try {
    const response = await instance.get('/carFuelTypes');
    return response.data;
  } catch (error) {
    return dataFetchError(error);
  }
};

const getJoinedCars = async (params) => {
  const requestUrl = 'http://localhost:5000/cars?_expand=user&_expand=model&_expand=transmission';
  const generatedUrl = appendUrlParams(requestUrl, params);

  const [fetchedCars, fetchedBrands, fetchedFuelTypes, fetchedCarFuelTypes] = await Promise.all([
    (async () => {
      const response = await axios.get(generatedUrl);
      return response.data;
    })(),
    getBrands(),
    getFuelTypes(),
    getCarFuelTypes(),
  ]);
  const joinedCars = fetchedCars.map((car) => (
    appendProps(car, fetchedBrands, fetchedFuelTypes, fetchedCarFuelTypes)
  ));
  return joinedCars;
};

const getJoinedCar = async (id) => {
  try {
    const [fetchedCar, fetchedBrands, fetchedFuelTypes, fetchedCarFuelTypes] = await Promise.all([
      (async () => {
        const response = await instance.get(
          `/cars/${id}?_expand=user&_expand=model&_expand=transmission`,
        );
        return response.data;
      })(),
      getBrands(),
      getFuelTypes(),
      getCarFuelTypes(),
    ]);
    const joinedCar = appendProps(fetchedCar, fetchedBrands, fetchedFuelTypes, fetchedCarFuelTypes);
    return joinedCar;
  } catch (error) {
    return dataFetchError(error);
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
