import React from 'react';
import {
  Grid,
  Button,
} from '@mui/material';

const PictureUpload = () => (
  <Grid item xs={12} md={4}>
    <Button variant="outlined" sx={{ mt: 2 }}>Įdėti nuotrauką</Button>
  </Grid>
);

export default PictureUpload;
