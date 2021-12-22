import React from 'react';
import {
  Link,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import HeroImage from '../../assets/home-page-hero-image.jpg';

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
          padding: '10px',
          width: {
            xs: '90%',
            sm: 'auto',
          },
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Box>
            <Typography
              variant="h3"
              component="h1"
              color="primary.light"
              sx={{
                textTransform: 'uppercase',
                fontSize: {
                  xs: '2rem',
                  md: '3rem',
                },
                textAlign: 'center',
              }}
            >
              Automobilių pardavimas
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              component="h2"
              color="primary.light"
              sx={{
                fontSize: {
                  xs: '0.9rem',
                  md: '1.25rem',
                },
                textAlign: 'center',
              }}
            >
              Parduodame automobilius už gerą kainą visoje Lietuvoje!
            </Typography>
          </Box>
          <Link href="tel:+37066356777" style={{ textDecoration: 'none' }}>
            <Button>
              <Typography
                variant="h4"
                color="secondary"
              >
                +370 663 56777
              </Typography>
              <PhoneEnabledRoundedIcon fontSize="large" color="secondary" />
            </Button>
          </Link>

          <Typography
            variant="h6"
            component="h2"
            color="primary.light"
          >
            Paskambinkite mums dabar
          </Typography>
        </Box>
      </Box>
      <NavLink to="/search" style={{ textDecoration: 'none' }}>
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
      </NavLink>
    </Box>
  </Box>
);

export default Hero;
