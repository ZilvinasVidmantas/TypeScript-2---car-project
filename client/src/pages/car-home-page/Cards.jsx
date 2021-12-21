import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

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

const Cards = ({ cards }) => cards.map(({ title, imgSrc }) => (
  <Grid key={title} item lg={4} sm={4} xs={12}>
    <Card>
      <StyledCardMedia>
        <img
          src={imgSrc}
          alt="car"
        />
      </StyledCardMedia>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
        >
          <Box data={title}>{title}</Box>
        </Typography>

        <CardActions>
          <Button variant="outlined" size="small">
            Sužinokite daugiau
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  </Grid>
));

export default Cards;
