import { Container, Grid } from '@mui/material';
import React from 'react';
import Cards from './home-page-cards';

const CardItems = [
  { title: 'Paprasta susisiekti', imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.anandgroupindia.com%2Fwp-content%2Fuploads%2F2019%2F05%2Fcontactus.jpg&f=1&nofb=1' },
  { title: 'Atvažiuojame į vietą', imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.revv.co.in%2Fblogs%2Fwp-content%2Fuploads%2F2020%2F09%2FCar-Rentals-in-India.jpg&f=1&nofb=1' },
  { title: 'Atsiskaitymai grynais', imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.etsystatic.com%2F10992313%2Fr%2Fil%2F44d384%2F1792365654%2Fil_794xN.1792365654_rzp9.jpg&f=1&nofb=1' },
];

const CardComponents = () => (
  <Container maxWidth="lg" sx={{ my: 2 }}>
    <Grid container spacing={2}>
      <Cards cards={CardItems} />
    </Grid>
  </Container>
);

export default CardComponents;
