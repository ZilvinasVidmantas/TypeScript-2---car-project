import React from 'react';
import {
  Container,
  Box,
  Typography,
} from '@mui/material';
import ProfilePagePhoto from './profile-page-photo';
import ProfilePageUserInfo from './profile-page-user-info';

const ProfilePage = () => (
  <Container
    component="main"
    maxWidth="md"
    sx={(theme) => ({ pt: '10%', minHeight: `calc(100vh - (${theme.mixins.footer.height}px + ${theme.mixins.toolbar.height}px))` })}
  >
    <Box sx={{ pb: '40px' }}>
      <Typography variant="h6">Profilis</Typography>
    </Box>
    <ProfilePagePhoto />
    <ProfilePageUserInfo />
  </Container>
);

export default ProfilePage;
