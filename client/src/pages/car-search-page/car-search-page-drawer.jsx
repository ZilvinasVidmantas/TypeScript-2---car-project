import React from 'react';
import {
  Box,
} from '@mui/material';
import CarFilters from './car-search-page-filters';

const CarSearchPageDrawer = ({
  onClick, onKeyDown, cars, onBackdropClick,
}) => (
  <Box
    // role="presentation"
    onClick={onClick}
    onKeyDown={onKeyDown}
    onBackdropClick={onBackdropClick}
  >
    <Box>
      <CarFilters className="filters" cars={cars} />
    </Box>
  </Box>
);

export default CarSearchPageDrawer;
