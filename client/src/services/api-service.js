import axios from 'axios';
import { dataFetchError } from '../helpers/index';
import { appendUrlParams } from '../helpers/url-helpers';

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

const getMinMax = (data, from) => {
  const values = data?.map((entity) => entity[from]);
  const uniqValues = values.sort((a, b) => a - b);
  const min = uniqValues.shift();
  const max = uniqValues.pop();
  return { min, max };
};

const getYears = async () => {
  try {
    const response = await instance.get('/cars');
    return getMinMax(response.data, 'year');
  } catch (error) {
    return dataFetchError(error);
  }
};

const getPrice = async () => {
  try {
    const response = await instance.get('/cars');
    return getMinMax(response.data, 'price');
  } catch (error) {
    return dataFetchError(error);
  }
};

const getJoinedCars = async (params) => {
  const requestUrl = 'http://localhost:5000/cars/joined?';
  const generatedParams = appendUrlParams(requestUrl, params);
  try {
    const joinedCars = await instance.get(generatedParams);
    return joinedCars.data;
  } catch (error) {
    return dataFetchError(error);
  }
};

const getJoinedCar = async (id) => {
  try {
    const joinedCar = await instance.get(`/cars/joined/${id}`);
    return joinedCar.data;
  } catch (error) {
    return dataFetchError(error);
  }
};

const getUser = async (id) => {
  try {
    const response = await instance.get(`/users/${id}`);
    return response.data;
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
  getYears,
  getPrice,
  getUser,
};

export default API;
