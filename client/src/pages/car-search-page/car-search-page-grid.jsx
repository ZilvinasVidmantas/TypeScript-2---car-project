import React, { useState, useEffect } from 'react';
import { Grid, Typography, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import CarSearchPageGridCard from './car-search-page-grid-card';

const CarGrid = ({ cars }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {Array.from(new Array(20)).map(() => (
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <Skeleton variant="rectangular" height="260px" />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {cars.map((
        {
          id, brand, model, year, price, images,
        },
      ) => (
        <Grid item key={id} xs={12} md={6} lg={4} xl={3}>
          <Link to={`/car/${id}`}>
            <CarSearchPageGridCard
              backgroundUrl={images[0]}
              title={`${brand} - ${model}`}
            >
              <Typography
                textAlign="center"
                component="h4"
                variant="h6"
                sx={{ pt: 6 }}
              >
                {`Metai: ${year} | Kaina: ${price} €`}
              </Typography>
            </CarSearchPageGridCard>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
export default CarGrid;
