import React from 'react';
import { Swiper } from 'swiper/react';
import SwiperCore, { EffectFade, Pagination } from 'swiper';

SwiperCore.use([Pagination, EffectFade]);

const CardSwiper = ({ children, ...props }) => (

  <Swiper
    {...props}
    slidesPerView={1}
    spaceBetween={20}
    pagination={{
      clickable: true,
    }}
    breakpoints={{
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1020: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1536: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    }}
  >
    {children}
  </Swiper>
);

export default CardSwiper;
