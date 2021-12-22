import React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import StyledNavLink from './styled-nav-link';
import Logo from './logo';

const Desktop = ({ handleCloseNavMenu, breakPoint }) => {
  const desktopStyles = {
    display: { xs: 'none', [breakPoint]: 'flex' },
  };

  return (
    <>
      <Logo sx={{ mr: 2, ...desktopStyles }} />
      <Box
        sx={{
          flexGrow: 1,
          height: '100%',
          alignItems: 'stretch',
          ...desktopStyles,
        }}
      >
        <StyledNavLink
          to="/"
          onClick={handleCloseNavMenu}
          breakPoint={breakPoint}
        >
          Home
        </StyledNavLink>
        <StyledNavLink
          to="/search"
          onClick={handleCloseNavMenu}
          breakPoint={breakPoint}
        >
          Search Cars
        </StyledNavLink>
      </Box>
      <Box
        sx={{
          ...desktopStyles,
        }}
      >
        <Link to="/sign-in">
          <Button
            sx={{
              height: '50px',
              width: '100px',
              fontWeight: 'bold',
              mr: 1,
            }}
            variant="contained"
            size="small"
          >
            Sign in
          </Button>
        </Link>
        <Link to="/sign-up">
          <Button
            sx={{
              height: '50px',
              width: '100px',
              fontWeight: 'bold',
            }}
            variant="contained"
            size="small"
          >
            Sign up
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default Desktop;
