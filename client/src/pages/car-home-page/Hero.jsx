import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import HeroImage from './heroImageNew.jpg';

const Hero = () => (
  <Box sx={{ height: '70vh' }}>
    <Box
      sx={{
        backgroundSize: 'cover',
        height: '100%',
        backgroundPosition: 'center',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(${HeroImage})`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          padding: '20px',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '48px',
              fontWeight: '500',
              lineHeight: '1.1',
              textAlign: 'left',
              color: '#424242',
              textTransform: 'uppercase',
            }}
          >
            Automobilių pardavimas
          </Typography>
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: '500',
              lineHeight: '1.1',
              color: '#424242',
            }}
          >
            Parduodame automobilius už gerą kainą visoje Lietuvoje!
          </Typography>
          <Typography
            sx={{
              fontSize: '40px',
              fontWeight: '500',
              color: '#d2583e',
              textTransform: 'uppercase',
            }}
          >
            +370 663 56777
          </Typography>
          <Typography
            sx={{
              color: '#424242',
              fontSize: '16px',
              fontWeight: '400',
            }}
          >
            Paskambinkite mums dabar
          </Typography>
        </Box>
      </Box>
      <Link to="/search">
        <Button
          sx={{
            height: '50px',
            width: '300px',
            fontWeight: 'bold',
            color: '#fff',
            borderColor: '#fff',
            marginBottom: '20px',
          }}
          variant="outlined"
        >
          Rinktis automobilį
        </Button>
      </Link>
    </Box>
  </Box>
);

export default Hero;
