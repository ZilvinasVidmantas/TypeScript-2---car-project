import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import CarCard from '../../components/cards/car-card';
import CarCardSkeleton from '../../components/skeletons/car-card-skeleton';

const CarGrid = ({ cars }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <CarCardSkeleton skeletonsAmount={20} />
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
          <CarCard key={uuidv4()} image={images[0]} title={`${brand} - ${model}`} subtitle={`Metai: ${year} | Kaina: ${price} €`} id={id} />
        </Grid>
      ))}
    </Grid>
  );
};
export default CarGrid;
