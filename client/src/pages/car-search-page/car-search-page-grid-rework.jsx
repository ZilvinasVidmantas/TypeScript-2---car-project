import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CarSearchPageGridCard from './car-search-page-grid-card';
// import { styled } from '@mui/material/styles';

const CarGrid = ({ cars }) => (
  <Grid container spacing={2} sx={{ mb: 2 }}>
    {cars.map(({
      id, brand, model, year, price, images,
    }) => (
      <Grid item key={id} xs={12} md={6} lg={4} xl={3}>
        <Link to={`/car/${id}`}>
          <CarSearchPageGridCard backgroundUrl={images[0]} title={`${brand} - ${model}`}>
            <Typography textAlign="center" component="h4" variant="h6" sx={{ pt: 6 }}>{`Metai: ${year} | Kaina: ${price} €`}</Typography>
          </CarSearchPageGridCard>
        </Link>
      </Grid>
    ))}
  </Grid>
);

export default CarGrid;
