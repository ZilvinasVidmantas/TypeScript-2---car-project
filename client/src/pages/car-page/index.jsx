import React, { useState, useEffect } from 'react';
import {
  Container, Box, Divider, Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import ImageFluid from '../../components/images/image-fluid';
import CarPageTitle from './car-page-title';
import ApiService from '../../services/api-service';
import CarPageAnimatedCarPropsContainer from './car-page-animated-car-props-container';
import CarPageCarProp from './car-page-car-prop';
import CarPageAnimatedContactContainer from './car-page-animated-contact-container';
import CarModel from '../../models/car-model';
import ImageSwiper from '../../components/swiper';

const animationDelayProgress = {
  xs: true,
  sm: false,
  lg: true,
};

const CarPage = () => {
  const [car, setCar] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const fetchedCar = await ApiService.getJoinedCar(id);
      const singleCar = new CarModel(fetchedCar);
      setCar(singleCar);
    })();
  }, [id]);

  const carProps = [
    { value: `${car?.price}$`, name: 'Kaina' },
    { value: car?.fuelType, name: 'Kuro tipas' },
    { value: car?.transmission, name: 'Pavarų dėžė' },
    { value: `${car?.engineVolume} l`, name: 'Variklio tūris' },
  ];

  const fullname = `${car?.user.name} ${car?.user.surname[0]}.`;
  let userInitials;
  if (car?.user) {
    userInitials = car.user.name[0] + car.user.surname[0];
  }

  const actions = [
    { href: car?.user.mobile, type: 'tel', btnText: 'Skambinti' },
    { href: car?.user.email, type: 'mailto', btnText: 'Siųsti el. laišką' },
  ];

  const carImages = [...new Set(car?.images)].map((pic) => (
    <ImageFluid key={pic} src={pic} />
  ));

  return (
    <Box
      component="main"
    >
      {car !== undefined ? (
        <Grid
          container
          sx={{
            alignItems: { lg: 'center' },
            minHeight: {
              xs: 'calc( 100vh - 128px )',
            },
          }}
        >
          <Grid item xs={12} lg={9}>
            <ImageSwiper images={carImages} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CarPageTitle
              brand={car?.brand}
              model={car?.model}
              year={car?.year}
            />
            <Container>
              <Grid
                container
                sx={{ mt: { sm: 2 }, flexDirection: { lg: 'column' } }}
              >
                <Grid item xs={12} sm sx={{ maxHeight: '250px' }}>
                  <CarPageAnimatedCarPropsContainer
                    delayProgress={animationDelayProgress}
                  >
                    {carProps.map(({ name, value }) => (
                      <CarPageCarProp key={name} name={name} value={value} />
                    ))}
                  </CarPageAnimatedCarPropsContainer>
                </Grid>

                <Grid item xs={12} sx={{ display: { sm: 'none' } }}>
                  <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={12} sm>
                  <CarPageAnimatedContactContainer
                    fullname={fullname}
                    userInitials={userInitials}
                    actions={actions}
                    delayProgress={animationDelayProgress}
                  />
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
};

export default CarPage;
