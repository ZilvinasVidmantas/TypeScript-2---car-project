import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { createUrlParamObj } from '../../helpers';
import APIService from '../../services/api-service';
import RangeFilter from '../../components/controls/range-filter';
import FilterContainer from '../../components/containers/filter-container';
import AutocompleteCheckboxFilter from '../../components/controls/autocomplete-checkbox-filter';

const CarFilters = ({ cars }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    brands: [],
    models: [],
    transmissions: [],
    fuelTypes: [],
    year: {
      min: 0,
      max: 1,
    },
    price: {
      min: 0,
      max: 1,
    },
  });
  const [showModels, setShowModels] = useState(false);

  const changeUrlFilters = (urlFilters) => {
    const newParams = createUrlParamObj(searchParams, urlFilters);
    setSearchParams(newParams);
  };

  const handleFilterChange = (selectedBrandOption, filter) => {
    searchParams.delete(filter);
    if (filter === 'brand' && selectedBrandOption.length > 0) {
      setShowModels(true);
    } else if (filter === 'brand' && selectedBrandOption.length <= 0) {
      setShowModels(false);
      searchParams.delete('model');
    }
    if (selectedBrandOption) {
      const urlFilter = selectedBrandOption.map(({ id }) => ({
        key: filter,
        value: id,
      }));
      changeUrlFilters(urlFilter);
    }
  };

  // Grazina min ir max reiksmes pagal nurodyta rakta is paduoto objektu masyvo
  const getMinMax = (data, from) => {
    const values = data.map((entity) => entity[from]);
    const uniqValues = values.sort((a, b) => a - b);
    const min = uniqValues.shift();
    const max = uniqValues.pop();
    return { min, max };
  };

  // Grazina min ir max filtru reiksmes
  const formatRangeFilters = (carsData) => ({ year: getMinMax(carsData, 'year'), price: getMinMax(carsData, 'price') });

  // Sukuria objekta su visais suformuotais filtrais
  const formatFilters = (fetchedFilters) => {
    const formatedFIlters = Object.entries(fetchedFilters).reduce(
      (result, [name, values]) => ({
        ...result,
        [name]: Object.values(values).map((item) => ({
          ...item,
          label: item.title,
        })),
      }),
      {
        brands: [],
        models: [],
        transmissions: [],
        fuelTypes: [],
      },
    );
    return { ...formatedFIlters, ...formatRangeFilters(cars) };
  };

  useEffect(() => {
    //  Immediatly invoked function expression
    (async () => {
      const fetchedFilters = {
        brands: await APIService.getBrands(),
        models: await APIService.getModels(),
        transmissions: await APIService.getTransmissions(),
        fuelTypes: await APIService.getFuelTypes(),
      };
      const formatedFilters = formatFilters(fetchedFilters);
      setFilters(formatedFilters);
    })();
  }, []);

  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Typography component="h2" variant="h4">
        Filtrai
      </Typography>
      {/* BRAND ------------------------------------------------------------------ */}
      <AutocompleteCheckboxFilter
        filterOptions={filters.brands}
        filterName="brand"
        label="Markė"
        onChange={(selectedFilterOptions, filterName) => handleFilterChange(
          selectedFilterOptions,
          filterName,
        )}
      />
      {/* BRAND ------------------------------------------------------------------ */}

      {/* MODEL ------------------------------------------------------------------ */}
      {showModels ? (
        <AutocompleteCheckboxFilter
          filterOptions={filters.models}
          filterName="model"
          label="Modelis"
          onChange={(selectedFilterOptions, filterName) => handleFilterChange(
            selectedFilterOptions,
            filterName,
          )}
        />
      ) : null}
      {/* MODEL ------------------------------------------------------------------ */}

      {/* PRICE ------------------------------------------------------------------ */}
      <FilterContainer title="Kaina">
        <RangeFilter
          key="asd"
          filterName="Price"
          onChange={() => null}
          selectedMin={filters.price.min}
          selectedMax={filters.price.max}
          min={filters.price.min}
          max={filters.price.max}
        />
      </FilterContainer>
      {/* PRICE ------------------------------------------------------------------ */}

      {/* YEAR ------------------------------------------------------------------ */}
      <FilterContainer title="Metai">
        <RangeFilter
          key="asds"
          filterName="Year"
          onChange={() => null}
          selectedMin={filters.year.min}
          selectedMax={filters.year.max}
          min={filters.year.min}
          max={filters.year.max}
        />
      </FilterContainer>
      {/* YEAR ------------------------------------------------------------------ */}

      {/* TRANSMISSION ------------------------------------------------------------------ */}
      <AutocompleteCheckboxFilter
        filterOptions={filters.transmissions}
        filterName="transmission"
        label="Pavarų dėžė"
        onChange={(selectedFilterOptions, filterName) => handleFilterChange(
          selectedFilterOptions,
          filterName,
        )}
      />
      {/* TRANSMISSION ------------------------------------------------------------------ */}

      {/* FUELTYPE ------------------------------------------------------------------ */}
      <AutocompleteCheckboxFilter
        filterOptions={filters.fuelTypes}
        filterName="fuelTypes"
        label="Kuro tipas"
        onChange={(selectedFilterOptions, filterName) => handleFilterChange(
          selectedFilterOptions,
          filterName,
        )}
      />
      {/* FUELTYPE ------------------------------------------------------------------ */}
    </Paper>
  );
};

export default CarFilters;
