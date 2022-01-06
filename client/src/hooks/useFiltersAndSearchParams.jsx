import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ApiService from '../services/api-service';
import { createUrlParamObj } from '../helpers';
import CarModel from '../models/car-model';

// Grazina min ir max reiksmes pagal nurodyta rakta is paduoto objektu masyvo
const getMinMax = (data, from) => {
  const values = data?.map((entity) => entity[from]);
  const uniqValues = values.sort((a, b) => a - b);
  const min = uniqValues.shift();
  const max = uniqValues.pop();
  return { min, max };
};

// Grazina min ir max filtru reiksmes
const formatRangeFilters = (carsData) => ({ year: getMinMax(carsData, 'year'), price: getMinMax(carsData, 'price') });

const useFiltersAndSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState([]);

  // Sukuria objekta su visais suformuotais filtrais
  const formatFilters = (fetchedFilters, fetchedCars) => ({
    brands: fetchedFilters[0],
    models: fetchedFilters[1],
    transmissions: fetchedFilters[2],
    fuelTypes: fetchedFilters[3],
    ...formatRangeFilters(fetchedCars),
  }
  );

  useEffect(() => {
    (async () => {
      const params = createUrlParamObj(searchParams);
      const [
        fetchedCars,
        ...fetchedFilters
      ] = await Promise.all([
        ApiService.getJoinedCars(params),
        ApiService.getBrands(),
        ApiService.getModels(),
        ApiService.getTransmissions(),
        ApiService.getFuelTypes(),
      ]);
      try {
        const modeledCars = fetchedCars.data.map((carData) => new CarModel(carData));
        const formatedFilters = formatFilters([...fetchedFilters], modeledCars);
        setFilters(formatedFilters);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const changeSearchParams = (selectedOptions, filterName) => {
    let params = [];
    searchParams.delete(filterName);
    if (selectedOptions) {
      params = selectedOptions.map(({ id }) => ({
        key: filterName,
        value: id,
      }));
    }
    const newParams = createUrlParamObj(searchParams, params);
    setSearchParams(newParams);
  };

  return {
    filters,
    changeSearchParams,
  };
};

export default useFiltersAndSearchParams;
