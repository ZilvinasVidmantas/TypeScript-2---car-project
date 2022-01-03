import React, { useState, useEffect } from 'react';
import { Grid, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
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
    <Grid
      container
      spacing={2}
      sx={{
        width: '100%',
      }}

    >
      {cars.map((
        {
          id, images, brand, model, year, price,
        },
      ) => (
        <Grid
          item
          key={id}
          xs={12}
          md={6}
          lg={4}
          xl={4}
          sx={{
            padding: '0',
          }}
        >
          <Link
            to={`/car/${id}`}
            style={{
              textDecoration: 'none',
            }}
          >
            <CarSearchPageGridCard key={uuidv4()} image={images[0]} title={`${brand} - ${model}`} subtitle={`Metai: ${year} | Kaina: ${price} €`} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
export default CarGrid;
