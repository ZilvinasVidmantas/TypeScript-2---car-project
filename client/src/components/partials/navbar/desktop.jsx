import React from 'react';
import { Box } from '@mui/material';
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
          height: '100%',
          alignItems: 'stretch',
          mr: 2,
          ...desktopStyles,
        }}
      >
        <StyledNavLink
          to="/sign-in"
          onClick={handleCloseNavMenu}
          breakPoint={breakPoint}
        >
          Sign in
        </StyledNavLink>
        <StyledNavLink
          to="/sign-up"
          onClick={handleCloseNavMenu}
          breakPoint={breakPoint}
        >
          Sign up
        </StyledNavLink>
      </Box>
    </>
  );
};

export default Desktop;
