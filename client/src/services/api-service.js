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

const fetchFuels = async () => {
  try {
    const response = await fetch('http://localhost:5000/fuelTypes');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Aprašyta klaida: Serverio klaida');
  }
};

const fetchJoinedCars = async (params) => {
  let requestUrl = 'http://localhost:5000/cars?_expand=user&_expand=model&_expand=transmission';

  if (params.brand) {
    const brandFilters = params.brand
      .map((brand) => `brandId=${brand}`)
      .join('&');

    requestUrl += `&${brandFilters}`;
  }
  if (params.model) {
    const modelFilters = params.model
      .map((model) => `modelId=${model}`)
      .join('&');

    requestUrl += `&${modelFilters}`;
  }
  if (params.transmissions) {
    const transmissionsFilters = params.transmissions
      .map((transmission) => `transmissionId=${transmission}`)
      .join('&');

    requestUrl += `&${transmissionsFilters}`;
  }

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
  fetchFuels,
};

export default API;
