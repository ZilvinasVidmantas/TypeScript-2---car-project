import React from 'react';
import {
  Container,
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const SignIn = () => (
  <Container component="main" maxWidth="xs" sx={{ pt: '5%', minHeight: 'calc(100vh - 128px)' }}>
    <Box>
      <Box sx={{
        mb: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
      </Box>
      <Box component="form" noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 5 }}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ height: 56 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item sx={{ mt: 1 }}>
            <Link to="/sign-up">
              Don&apos;t have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
);
export default SignIn;
