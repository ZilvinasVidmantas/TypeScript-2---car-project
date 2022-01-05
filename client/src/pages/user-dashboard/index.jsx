import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import UserCars from './user-dashboard-user-cars';
import LikedCars from './user-dashboard-liked-cars';

const UserDashboard = () => (
  <Box
    component="main"
  >
    <Toolbar />
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography component="h3" variant="h6" sx={{ mb: 4 }}>
        Labas, vartojoVardas
      </Typography>
      <Grid container spacing={3}>
        {/* automobiliai */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
            <UserCars />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
            <LikedCars />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default UserDashboard;
