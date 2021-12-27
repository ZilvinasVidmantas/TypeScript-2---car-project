import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import CarTable from './car-search-page-table';
import CarFilters from './car-search-page-filters';
import ApiService from '../../services/api-service';
import CarModel from '../../models/car-model';
import { createUrlParamObj } from '../../helpers';
import CarOptions from './car-search-page-options';
import CarGrid from './car-search-page-grid';
import LoadingImg from './assets/loading.gif';

const CarSearch = () => {
  const [cars, setCars] = useState([]);
  const [carSearchViewType, setCarSearchViewType] = useState('table'); // Atvaizdavimo tipas
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const params = createUrlParamObj(searchParams);
      const fetchedCars = await ApiService.getJoinedCars(params);
      const modeledCars = fetchedCars.map((carData) => new CarModel(carData));
      setCars(modeledCars);
    })();
  }, [searchParams]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  // Keiciamas atvaizdavimo tipas
  const handleViewChange = (_, nextView) => {
    setCarSearchViewType(nextView);
  };

  const dataView = carSearchViewType === 'table' ? (
    // Jei atvaizdavimo tipas lentele
    <CarTable cars={cars} />
  ) : (
    // Jei atvaizdavimo tipas ne lentele
    <CarGrid cars={cars} />
  );
  return loading ? (
    <Container sx={{
      height: 'calc(100vh - 128px)', display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <img src={LoadingImg} alt="..." style={{ objectFit: 'cover' }} />
    </Container>
  ) : (
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
          <CarFilters cars={cars} />
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
