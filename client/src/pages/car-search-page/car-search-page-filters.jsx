import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Autocomplete,
  TextField,
  Checkbox,
} from '@mui/material';
// import CheckboxGroupFilter from '../../components/controls/checkbox-group-filter';
// import RangeFilter from '../../components/controls/range-filter';
import { useSearchParams } from 'react-router-dom';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { createUrlParamObj } from '../../helpers';
import APIService from '../../services/api-service';
import RangeFilter from '../../components/controls/range-filter';
import FilterContainer from '../../components/containers/filter-container';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CarFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    brands: [],
    models: [],
    transmissions: [],
    fuelTypes: [],
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

  // Sukuria objekta su visais filtrais ir juos suformatuoja
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
    return formatedFIlters;
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
      <FilterContainer title="Markė">
        <Autocomplete
          noOptionsText="Tokių filtrų nėra"
          multiple
          id="checkboxes-tags-demo"
          options={filters.brands}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} placeholder="Pasirinkti" />
          )}
          onChange={(_, selectedFilterOptions) => handleFilterChange(selectedFilterOptions, 'brand')}
        />
      </FilterContainer>
      {/* BRAND ------------------------------------------------------------------ */}

      {/* MODEL ------------------------------------------------------------------ */}
      {showModels ? (
        <FilterContainer title="Modelis">
          <Autocomplete
            noOptionsText="Tokių filtrų nėra"
            multiple
            id="checkboxes-tags-demo"
            options={filters.models}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.title}
              </li>
            )}
// style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Pasirinkti" />
            )}
            onChange={(_, selectedBrandOption) => handleFilterChange(selectedBrandOption, 'model')}
          />
        </FilterContainer>
      ) : null}
      {/* MODEL ------------------------------------------------------------------ */}

      {/* PRICE ------------------------------------------------------------------ */}
      <FilterContainer title="Kaina">
        <RangeFilter
          key="asd"
          filterName="bablo"
          onChange={(param) => console.log(param)}
          selectedMin={0}
          selectedMax={10}
          min={0}
          max={10}
        />
      </FilterContainer>
      {/* PRICE ------------------------------------------------------------------ */}

      {/* YEAR ------------------------------------------------------------------ */}
      <FilterContainer title="Metai">
        <RangeFilter
          key="asds"
          filterName="YEAR"
          onChange={(param) => console.log(param)}
          selectedMin={2000}
          selectedMax={2021}
          min={2000}
          max={2021}
        />
      </FilterContainer>
      {/* YEAR ------------------------------------------------------------------ */}

      {/* TRANSMISSION ------------------------------------------------------------------ */}
      <FilterContainer title="Pavarų dėžė">
        <Autocomplete
          noOptionsText="Tokių filtrų nėra"
          multiple
          id="checkboxes-tags-demo"
          options={filters.transmissions}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} placeholder="Pasirinkti" />
          )}
          onChange={(_, selectedFilterOptions) => handleFilterChange(selectedFilterOptions, 'transmissions')}
        />
      </FilterContainer>
      {/* TRANSMISSION ------------------------------------------------------------------ */}

      {/* FUELTYPE ------------------------------------------------------------------ */}
      <FilterContainer title="Kuro tipas">
        <Autocomplete
          noOptionsText="Tokių filtrų nėra"
          multiple
          id="checkboxes-tags-demo"
          options={filters.fuelTypes}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} placeholder="Pasirinkti" />
          )}
          onChange={(_, selectedFilterOptions) => handleFilterChange(selectedFilterOptions, 'fuelTypes')}
        />
      </FilterContainer>
      {/* FUELTYPE ------------------------------------------------------------------ */}
    </Paper>
  );
};

export default CarFilters;
