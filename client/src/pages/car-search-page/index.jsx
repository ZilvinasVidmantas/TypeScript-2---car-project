/*  eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Fab, Paper
} from '@mui/material';
import { styled} from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';
import CarTable from './car-search-page-table';
import CarFilters from './car-search-page-filters';
import ApiService from '../../services/api-service';
import CarModel from '../../models/car-model';
import { createUrlParamObj } from '../../helpers';
import CarOptions from './car-search-page-options';
import CarGrid from './car-search-page-grid';
import LoadingImg from './assets/loading.gif';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';

const ScrollableContainer = styled(Paper)(({theme}) => ({
  overflowY: 'scroll',
  height: 600
}))

const CarSearch = () => {
  const [cars, setCars] = useState([]);
  const [carSearchViewType, setCarSearchViewType] = useState(''); // Atvaizdavimo tipas
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    (async () => {
      const params = createUrlParamObj(searchParams);
      const fetchedCars = await ApiService.getJoinedCars(params);
      const modeledCars = fetchedCars.map((carData) => new CarModel(carData));
      setCars(modeledCars);
    })();
    // setYear(getMinMax('year'));
    // setPrice(getMinMax('price'));
    // console.log(year);
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
      <Container maxWidth="xl" sx={{ height: '100%', overflow: 'hidden' }} >
          {cars.length > 0 ? (
            <Typography component="h1" variant="h3" gutterBottom align="center">
              Mašinos
            </Typography>
          ) : null}
        <ScrollableContainer>
          {cars.length > 0 ? dataView : null}
        </ScrollableContainer>
          <Fab color="primary" aria-label="add">
            <SettingsInputCompositeIcon />
          </Fab>
      </Container>
  );
};

export default CarSearch;

{/* <CarOptions view={carSearchViewType} onChange={handleViewChange} /> */}
{/* <CarFilters /> */}
