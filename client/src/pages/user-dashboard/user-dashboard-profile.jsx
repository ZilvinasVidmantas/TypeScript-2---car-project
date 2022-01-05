import React from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

const UserDashboardProfile = () => (
  <Paper sx={{
    py: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  }}
  >
    <img src="https://unsplash.it/150/150" alt="user" style={{ borderRadius: '50%', height: '150px', width: '150px' }} />
    <Typography component="h3" variant="h6" sx={{ my: 3, alignSelf: 'center' }}> VartojoVardas </Typography>
    <Box>
      <Typography sx={{ display: 'flex' }}>
        <span style={{ width: '120px' }}>El. paštas :</span>
        <span style={{ width: 'calc(100% - 120px)' }}>abc@abc.lt</span>
      </Typography>
      <Typography sx={{ display: 'flex' }}>
        <span style={{ width: '120px' }}>Telefonas :</span>
        <span style={{ width: 'calc(100% - 120px)' }}>86 123-456</span>
      </Typography>
      <Typography sx={{ display: 'flex' }}>
        <span style={{ width: '120px' }}>Miestas :</span>
        <span style={{ width: 'calc(100% - 120px)' }}>Vilniava</span>
      </Typography>
    </Box>
    <StyledLink to="/add-car">
      <Button variant="outlined" sx={{ mt: 4 }}> Pridėti automobilį </Button>
    </StyledLink>
  </Paper>
);

export default UserDashboardProfile;
