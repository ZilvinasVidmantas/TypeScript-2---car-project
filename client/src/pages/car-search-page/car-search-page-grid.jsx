import React from 'react';
import { Card, CardHeader, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledCardLink = styled(Link)({
  textDecoration: 'none',
  color: 'black',
  '& .textCollapse div': {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  '& span': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  '& :hover div': {
    opacity: '0.55',
  },
});

const StyledCardMedia = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  ':after': {
    content: '" "',
    display: 'block',
    width: '100%',
    paddingBottom: '100%',
  },
  '>img': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const CarGrid = ({ cars }) => {
  console.log(cars);
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {cars.map(({
        id, brand, model, year, price, images,
      }) => (
        <Grid item key={id} xs={12} md={6} lg={4} xl={3}>
          <StyledCardLink to={`/car/${id}`}>
            <Card raised>
              <CardHeader
                className="textCollapse"
                title={`${brand} - ${model}`}
                subheader={`Metai: ${year} | Kaina: ${price} €`}
                align="center"
                sx={{ pb: 1, fontSize: '2.5vw' }}
              />
              <StyledCardMedia>
                <img
                  src={images[0]}
                  alt="car"
                />
              </StyledCardMedia>
            </Card>
          </StyledCardLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default CarGrid;
