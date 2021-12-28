import React from 'react';
import {
  TextField,
  Grid,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import FormContainer from '../../components/containers/form-container';
import FormButton from '../../components/buttons/form-button';

const title = ['Sign In'];

const SignIn = () => (
  <FormContainer title={title}>
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
      <FormButton title={title} />
      <Grid container>
        <Grid item sx={{ mt: 1 }}>
          <Link to="/sign-up">
            Don&apos;t have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </Box>
  </FormContainer>
);
export default SignIn;
