import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import CarTable from './car-search-page-table';
import CarFilters from './car-search-page-filters';
import ApiService from '../../services/api-service';
import CarModel from '../../models/car-model';
import { createUrlParamObj } from '../../helpers';
import CarOptions from './car-search-page-options';
import CarGrid from './car-search-page-grid';

const CarSearch = () => {
  const [cars, setCars] = useState([]);
  const [carSearchViewType, setCarSearchViewType] = useState('table'); // Atvaizdavimo tipas
  const [searchParams] = useSearchParams();
  // const [year, setYear] = useState({ min: 0, max: 0 });
  // const [price, setPrice] = useState({ min: 0, max: 0 });

  // if (cars[0]) {
  // console.table(cars[0].brand);
  // }

  // searchParams.keys((next) => console.log(next));

  // const getMinMax = (from) => {
  // const values = cars?.map((entity) => entity[from]);
  // const uniqValues = values.sort((a, b) => a - b);
  // const min = uniqValues.shift();
  // const max = uniqValues.pop();
  // return { min, max };
  // };

  useEffect(
    () => {
      (async () => {
        const params = createUrlParamObj(searchParams);
        const fetchedCars = await ApiService.fetchJoinedCars(params);
        const modeledCars = fetchedCars.map((carData) => new CarModel(carData));
        setCars(modeledCars);
      })();
      // setYear(getMinMax('year'));
      // setPrice(getMinMax('price'));
      // console.log(year);
    },
    [searchParams],
  );

  // Keiciamas atvaizdavimo tipas
  const handleViewChange = (_, nextView) => {
    setCarSearchViewType(nextView);
  };

  const dataView = carSearchViewType === 'table'
    // Jei atvaizdavimo tipas lentele
    ? (
      <CarTable cars={cars} />
    ) : (
    // Jei atvaizdavimo tipas ne lentele
      <CarGrid cars={cars} />
    );
  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      {cars.length > 0 ? (
        <Typography component="h1" variant="h3" gutterBottom align="center">
          Mašinos
        </Typography>
      ) : null}
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {/* Atvaizdavimo pasirinkimai */}
          <CarOptions view={carSearchViewType} onChange={handleViewChange} />
          <CarFilters />
        </Grid>
        <Grid item xs={10}>
          {/* Jei yra masinu */}
          {cars.length > 0 ? dataView : null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CarSearch;
