import React, { useState, useEffect } from 'react';
import {
  Container, Box, Divider, Grid, styled,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, EffectFade } from 'swiper';
import ImageFluid from '../../components/images/image-fluid';
import CarPageTitle from './car-page-title';
import ApiService from '../../services/api-service';
import CarPageAnimatedCarPropsContainer from './car-page-animated-car-props-container';
import CarPageCarProp from './car-page-car-prop';
import CarPageAnimatedContactContainer from './car-page-animated-contact-container';
import CarModel from '../../models/car-model';
import { getWindowWidth } from '../../helpers/window-helpers';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import './styles/swiperArrow.css';

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

  const screenWidth = getWindowWidth();
  const CarPageImageContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.up('xs')]: {
      height: '47vh',
    },
    [theme.breakpoints.up('md')]: {
      height: '55vh',
    },
    [theme.breakpoints.up('lg')]: {
      height: '86.3vh',
    },
    '>img': {
      position: 'absolute',
      objectFit: 'cover',
      objectPosition: 'center',
    },
  }));

  const mainImageSrc = [...new Set(car?.images)].map((pic) => (
    <SwiperSlide className="swiper-slide">
      <CarPageImageContainer>
        <ImageFluid key={pic} src={pic} />
      </CarPageImageContainer>
    </SwiperSlide>
  ));

  SwiperCore.use([Navigation, Pagination, EffectFade]);

  console.log(carProps);
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
            {screenWidth > 370 ? (
              <Swiper
                slidesPerView={1}
                effect="fade"
                loop
                navigation={{
                  navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  },
                }}
              >
                {mainImageSrc}
              </Swiper>
            )
              : (
                <Swiper
                  slidesPerView={1}
                  effect="fade"
                  loop
                  pagination
                >
                  {mainImageSrc}
                </Swiper>
              )}

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
