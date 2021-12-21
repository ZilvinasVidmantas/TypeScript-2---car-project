import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { FaPhone, FaEnvelope } from 'react-icons/fa';

import { Box, Typography } from '@mui/material';

const MiniNavbar = () => (
  <Box sx={{ backgroundColor: 'orangered' }}>
    <a href="/">
      <FaPhone />
      {' '}
      <Typography
        sx={{
          fontWeight: '400',
          marginTop: '9px',
          paddingBottom: '10px',
          paddingLeft: '60px',
        }}
      >
        +370 663 56777
      </Typography>
    </a>
    <a
      rel="noopener noreferrer"
      target="_blank"
      href="mailto:info@supirkimas-auto.lt"
      id="btn-1615113012823"
      className="sppb-btn  sppb-btn-link sppb-btn-rounded sppb-btn-flat"
    >
      <FaEnvelope sx={{ bgColor: 'white' }} />
      {' '}
      info@pardavimas-auto.lt
    </a>
  </Box>
);

export default MiniNavbar;
