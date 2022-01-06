import React, { useState } from 'react';
import {
  Typography,
  Paper,
} from '@mui/material';
import RangeFilter from '../../components/controls/range-filter';
import AutocompleteCheckboxFilter from '../../components/controls/autocomplete-checkbox-filter';
import useFiltersAndSearchParams from '../../hooks/useFiltersAndSearchParams';

const CarFilters = ({ filters }) => {
  const [filterss] = useState(filters);
  const [showModels, setShowModels] = useState(false);
  const { changeSearchParams } = useFiltersAndSearchParams();

  const handleFilterChange = (selectedOptions, filterName) => {
    if (filterName === 'brand' && selectedOptions.length > 0) {
      setShowModels(true);
    } else if (filterName === 'brand' && selectedOptions.length <= 0) {
      setShowModels(false);
    }
    changeSearchParams(selectedOptions, filterName);
  };

  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Typography component="h2" variant="h4">
        Filtrai
      </Typography>
      {/* BRAND ------------------------------------------------------------------ */}
      <AutocompleteCheckboxFilter
        filterOptions={filterss.brands}
        filterName="brand"
        label="Markė"
        onChange={(selectedOptions, filterName) => handleFilterChange(
          selectedOptions,
          filterName,
        )}
      />
      {/* BRAND ------------------------------------------------------------------ */}

      {/* MODEL ------------------------------------------------------------------ */}
      {showModels ? (
        <AutocompleteCheckboxFilter
          filterOptions={filterss.models}
          filterName="model"
          label="Modelis"
          onChange={(selectedOptions, filterName) => handleFilterChange(
            selectedOptions,
            filterName,
          )}
        />
      ) : null}
      {/* MODEL ------------------------------------------------------------------ */}

      {/* PRICE ------------------------------------------------------------------ */}
      <RangeFilter
        title="Kaina"
        filterName="Price"
        onChange={() => null}
        selectedMin={filterss.price.min}
        selectedMax={filterss.price.max}
        min={filterss.price.min}
        max={filterss.price.max}
      />
      {/* PRICE ------------------------------------------------------------------ */}

      {/* YEAR ------------------------------------------------------------------ */}
      <RangeFilter
        title="Metai"
        filterName="Year"
        onChange={() => null}
        selectedMin={filterss.year.min}
        selectedMax={filterss.year.max}
        min={filterss.year.min}
        max={filterss.year.max}
      />
      {/* YEAR ------------------------------------------------------------------ */}

      {/* TRANSMISSION ------------------------------------------------------------------ */}
      <AutocompleteCheckboxFilter
        filterOptions={filterss.transmissions}
        filterName="transmission"
        label="Pavarų dėžė"
        onChange={(selectedOptions, filterName) => handleFilterChange(
          selectedOptions,
          filterName,
        )}
      />
      {/* TRANSMISSION ------------------------------------------------------------------ */}

      {/* FUELTYPE ------------------------------------------------------------------ */}
      <AutocompleteCheckboxFilter
        filterOptions={filterss.fuelTypes}
        filterName="fuelType"
        label="Kuro tipas"
        onChange={(selectedOptions, filterName) => handleFilterChange(
          selectedOptions,
          filterName,
        )}
      />
      {/* FUELTYPE ------------------------------------------------------------------ */}
    </Paper>
  );
};

export default CarFilters;
