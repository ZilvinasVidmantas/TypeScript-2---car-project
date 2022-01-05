import axios from 'axios';
import { dataFetchError } from '../helpers/index';

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

const getJoinedCars = async () => {
  try {
    const joinedCars = await instance.get('/cars/joined');
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

const API = {
  getJoinedCars,
  getJoinedCar,
  getBrands,
  getModels,
  getTransmissions,
  getFuelTypes,
};

export default API;
