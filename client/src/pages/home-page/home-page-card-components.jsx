import { Container, Grid } from '@mui/material';
import React from 'react';

const CardComponents = ({ children }) => (
  <Container maxWidth="lg" sx={{ my: 2 }}>
    <Grid container spacing={2}>
      { children }
    </Grid>
  </Container>
);

export default CardComponents;
