import React from 'react';
import Box from '@mui/material/Box';

const Footer = () => (
  <Box
    bgcolor="#252525"
    textAlign="center"
    pt={{ xs: 1 }}
    pb={{ xs: 1 }}
    sx={{
      color: '#fff',
      paddingRight: '10px',
      paddingLeft: '10px',
      position: 'relative',
      width: '100%',
      bottom: '0',
    }}
  >
    Automobilių supirkimas &reg; 2021 Visos teisės saugomos.
  </Box>
);

export default Footer;
