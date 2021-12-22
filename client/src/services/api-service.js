import axios from 'axios';
import { appendUrlParams, handleErrors } from '../helpers/index';

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

const getCarFuelTypes = async () => {
  const response = await instance.get('/carFuelTypes').then((resp) => resp.data).catch(handleErrors);
  return response;
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
