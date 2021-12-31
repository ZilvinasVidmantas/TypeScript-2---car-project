import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Fab, useTheme, Drawer,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import { styled } from '@mui/material/styles';
import CarTable from './car-search-page-table';
import CarFilters from './car-search-page-filters';
import ApiService from '../../services/api-service';
import CarModel from '../../models/car-model';
import { createUrlParamObj } from '../../helpers';
import CarOptions from './car-search-page-options';
import CarGrid from './car-search-page-grid';
import LoadingImg from './assets/loading.gif';
import CarSearchPageDrawer from './car-search-page-drawer';

const StyledGridItem = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  right: 10,
  bottom: 10,
  zIndex: 10,
  position: 'fixed',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const CarSearch = () => {
  const [cars, setCars] = useState([]);
  const [carSearchViewType, setCarSearchViewType] = useState('table'); // Atvaizdavimo tipas
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const [state, setState] = useState({
    // top: false,
    left: false,
    // bottom: false,
    // right: false,
  });

  const toggleDrawer = (option) => () => {
    setState({ ...state, left: option });
  };

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
      height: `calc(100vh - (${theme.mixins.footer.height}px + ${theme.mixins.toolbar.height}px))`, display: 'flex', justifyContent: 'center', alignItems: 'center',
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
        <StyledGridItem item md={12} lg={2}>
          {/* Atvaizdavimo pasirinkimai */}
          <CarOptions view={carSearchViewType} onChange={handleViewChange} />
          <CarFilters className="filters" cars={cars} />
        </StyledGridItem>
        <Grid item xs={12} sm={12} md={12} lg={10}>
          {/* Jei yra masinu */}
          {cars.length > 0 ? dataView : null}
        </Grid>
      </Grid>
      <StyledFab
        color="primary"
        aria-label="add"
        size="small"
        onClick={toggleDrawer(true)}
      >
        <SettingsInputCompositeIcon fontSize="small" />
      </StyledFab>
      <Drawer
        open={state.left}
        onClose={toggleDrawer(false)}
        onBackdropClick={toggleDrawer(false)}
      >
        <CarSearchPageDrawer
          onClick={toggleDrawer(true)}
          onKeyDown={toggleDrawer(true)}
          cars={cars}
          onClose={toggleDrawer(false)}
        />
      </Drawer>
    </Container>
  );
};

export default CarSearch;
